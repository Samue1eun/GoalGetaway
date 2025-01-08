import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core.cache import cache

class CityPlacesView(APIView):
    def get(self, request, city_name):
        geocode_url = "https://maps.googleapis.com/maps/api/geocode/json"
        geocode_params = {
            'key': settings.GOOGLE_PLACES_KEY,
            'address': city_name
        }
        geocode_response = requests.get(geocode_url, params=geocode_params)

        if geocode_response.status_code != 200:
            return Response({"error": "Failed to get city coordinates"}, status=geocode_response.status_code)
        
        geocode_data = geocode_response.json()

        try:
            location = geocode_data['results'][0]['geometry']['location']
            lat, lng = location['lat'], location['lng']
        except (IndexError, KeyError):
            return Response({"error": "City Not Found"}, status=status.HTTP_404_NOT_FOUND)



        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        nearby_params = {
            'key': settings.GOOGLE_PLACES_KEY,
            'location': f"{lat},{lng}",
            'radius': 5000,
            'type': 'bar'
        }
        nearby_response = requests.get(url, params=nearby_params)
        nearby_data = nearby_response.json()
        return JsonResponse(nearby_data, status=status.HTTP_200_OK)
    
class GameTodayView(APIView):

    # Add to the end of the endpoint to get the games on a specific day, this is how your
    # endpoint must look must look like: 
    # http://127.0.0.1:8000/api/v1/api_app/today_games/?dates[]=2024-12-29&dates[]=2024-12-30
    # NOTE: it begins with a question mark followed by "dates[]=" and the <date>(format:YYYY-MM-DD)
    # for every date you wish to add follow it by an "&" and the above mentioned format again.
    # The body will be ignored so do not use it. 
    # Do not end the endpoint with a "/"

    def get(self, request):
        API_KEY = settings.GAME_STATS_KEY
        dates = request.GET.getlist("dates[]")

        if not dates:
            return JsonResponse(
                {"error": "Please provide at least one date in the 'dates[]' parameter."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        query_params = "&".join([f"dates[]={date}" for date in dates])

        url = f"https://api.balldontlie.io/nfl/v1/games?{query_params}"

        try:
            response = requests.get(
                url,
                headers={"Authorization": API_KEY}
            )
            response.raise_for_status()
            return JsonResponse(response.json(), safe=False, status=response.status_code)
        except requests.RequestException as e:
            return JsonResponse(
                {"error": "An error occurred while fetching games.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class NFLTeamView(APIView):
    def get(self, request):
        API_KEY = settings.SPORTS_DATA_KEY
        api_url = "https://api.sportsdata.io/v3/nfl/scores/json/Teams"

        headers = {
            "Ocp-Apim-Subscription-Key": API_KEY,
        }

        response = requests.get(api_url, headers=headers)

        if response.status_code == 200:
            teams_data = response.json()

            return JsonResponse(teams_data, safe=False)
        else:
            return JsonResponse(
                {"error": "Failed to fetch data from SportsData API", "status_code": response.status_code},
                status=response.status_code
            )

class FlightScheduleView(APIView):
    def get(self, request):
        iata = request.GET.get("iata")
        mode = request.GET.get("mode")
        day = request.GET.get("day")

        if not iata or not mode:
            return JsonResponse({"error": "Missing required parameters: 'iata' and 'mode' are required."}, status=400)

        API_KEY = settings.FLIGHT_DATA_KEY
        print(f"Using API Key: {API_KEY}")

        api_url = f"https://api.flightapi.io/schedule/{API_KEY}?mode={mode}&iata={iata}"
        if day:
            api_url += f"&day={day}"

        try:
            response = requests.get(api_url)
            response.raise_for_status() 
            data = response.json()
            return JsonResponse(data, safe=False)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Failed to fetch flight schedule.", "details": str(e)}, status=500)
        
import requests
from django.http import JsonResponse
from django.conf import settings

class HotelView(APIView):
    def get(self, request, cityCode):
        if not cityCode:
            return JsonResponse({"error": "Missing required parameter 'iata' (city code)."}, status=400)

        access_token = cache.get('amadeus_access_token')

        if not access_token:
            token_url = "https://test.api.amadeus.com/v1/security/oauth2/token"
            token_data = {
                "grant_type": "client_credentials",
                "client_id": settings.AMAEDEUS_API_KEY,
                "client_secret": settings.AMAEDEUS_SECRET_KEY
            }

            token_response = requests.post(token_url, data=token_data)

            if token_response.status_code != 200:
                return JsonResponse(
                    {"error": "Failed to authenticate with Amadeus API.", "details": token_response.json()},
                    status=500
                )

            token_json = token_response.json()
            access_token = token_json.get('access_token')
            expires_in = token_json.get('expires_in', 1799)

            if not access_token:
                return JsonResponse({"error": "Authentication response did not include an access token."}, status=500)

            cache.set('amadeus_access_token', access_token, timeout=expires_in)

        hotels_url = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city"
        headers = {"Authorization": f"Bearer {access_token}"}
        params = {"cityCode": cityCode}

        print("Requesting hotels with params:", params)

        hotels_response = requests.get(hotels_url, headers=headers, params=params)

        if hotels_response.status_code != 200:
            return JsonResponse(
                {"error": "Failed to fetch hotel data from Amadeus API.", "details": hotels_response.json()},
                status=hotels_response.status_code
            )

        return JsonResponse(hotels_response.json(), safe=False)
    
class HotelDetailsView(APIView):
    def get(self, request, hotel_name):
        if not hotel_name:
            return JsonResponse(
                {"error": "Missing required URL parameter: 'hotel_name'."},
                status=400
            )
        
        formatted_hotel_name = hotel_name.replace("_", " ").strip().title()

        print(f"Formatted Hotel Name: {formatted_hotel_name}")
        
        google_places_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
        
        params = {
            "key": settings.GOOGLE_PLACES_KEY,
            "radius": 1000, 
            "query": formatted_hotel_name 
        }
        
        response = requests.get(google_places_url, params=params)
        
        if response.status_code != 200:
            return JsonResponse({"error": "Failed to fetch hotel details from Google Places API."}, status=500)
        
        data = response.json()
        
        if data.get("results"):
            hotel_details = data["results"][0]
            return JsonResponse(hotel_details, safe=False)
        else:
            return JsonResponse({"error": "No details found for the given hotel."}, status=404)

class FlightBookingView(APIView):
    def get(self, request, originLocationCode, destinationLocationCode, departureDate, adults):
        
        if not all([originLocationCode, destinationLocationCode, departureDate, adults]):
            return JsonResponse({"error": "Missing required parameters."}, status=400)
        
        try:
            access_token = cache.get('amadeus_access_token')

            if not access_token:
                token_url = "https://test.api.amadeus.com/v1/security/oauth2/token"
                token_data = {
                    "grant_type": "client_credentials",
                    "client_id": settings.AMAEDEUS_API_KEY,
                    "client_secret": settings.AMAEDEUS_SECRET_KEY
                }

            token_response = requests.post(token_url, data=token_data)

            if token_response.status_code != 200:
                return JsonResponse(
                    {"error": "Failed to authenticate with Amadeus API.", "details": token_response.json()},
                    status=500
                )

            token_json = token_response.json()
            access_token = token_json.get('access_token')
            expires_in = token_json.get('expires_in', 1799)

            if not access_token:
                return JsonResponse({"error": "Authentication response did not include an access token."}, status=500)

            cache.set('amadeus_access_token', access_token, timeout=expires_in)

            amadeus_url = "https://test.api.amadeus.com/v2/shopping/flight-offers/"
            params = {
                "originLocationCode": originLocationCode,
                "destinationLocationCode": destinationLocationCode,
                "departureDate": departureDate,
                "adults": adults,
            }
            headers = {
                "Authorization": f"Bearer {access_token}",
            }

            print(f"Amadeus URL: {amadeus_url}")
            print(f"Parameters: {params}")
            print(f"Headers: {headers}")

            flight_response = requests.get(amadeus_url, params=params, headers=headers)
            flight_response.raise_for_status()

            flight_data = flight_response.json()
            return JsonResponse(flight_data, safe=False)

        except requests.exceptions.RequestException as e:
            print(f"Error Response Content: {e.response.text if e.response else 'No Response Content'}")
            return JsonResponse({"error": str(e)}, status=500)