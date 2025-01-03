import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

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

    # endpoint to get game on a specific day must look like: 
    # http://127.0.0.1:8000/api/v1/api_app/today_games/?dates[]=2024-12-29&dates[]=2024-12-30

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
