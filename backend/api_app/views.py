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

class NFLTeamStandings(APIView):
    
    # Similar to the GameTodayView class the endpoint needs to be modified to 
    # look like this: 
    # http://127.0.0.1:8000/api/v1/api_app/team_standings/?season=2023
    # the addition of "?season=" is already added for you in the code,
    # simply make sure that when passing the request from the frontend 
    # that you specify the season's year for example 2023 will encompass
    # 2023-2024's season. 
    
    def get(self, request):
        API_KEY = settings.BALL_DONT_LIE_ALLSTAR_KEY
        season_year = request.GET.get("season")
        
        url = f"https://api.balldontlie.io/nfl/v1/standings?season={season_year}"
        try:
            response = requests.get(
                url,
                headers={"Authorization": API_KEY}
            )
            if response.status_code == 200:
                teams_data = response.json()
                return JsonResponse(teams_data, safe=False)
        except:
            return JsonResponse("Error: ", response.status_code, safe=False)
        
class TopTenStats(APIView):
    
    # Similar to the GameTodayView class the endpoint needs to be modified to 
    # look like this: 
    # http://127.0.0.1:8000/api/v1/api_app/team_standings/?season=2023
    # the addition of "?season=", "&sort_by=", and "&sort_order=desc"
    # is already added for you in the code,simply make sure that when passing 
    # the request from the frontend that you specify the season's year and the 
    # requested statistic your looking for. For example passing "2023" for the 
    # season and "rushing_yards" will return the top ten players sorts in descending
    # order for the 2023-2024 season. Here are some examples of the possibles 
    # params you can pass for the requested_param: rushing_yards, passing_yards, 
    # receiving yards, defensive_sacks, etc. Refer to this link for the full
    # list of possible params. https://nfl.balldontlie.io/#get-season-stats
    
   def get(self, request):
    API_KEY = settings.BALL_DONT_LIE_ALLSTAR_KEY
    season_year = request.GET.get("season")
    requested_param = request.GET.get("stat_requested")

    url = f"https://api.balldontlie.io/nfl/v1/season_stats?season={season_year}&sort_by={requested_param}&sort_order=desc"
    
    try:
        response = requests.get(
            url,
            headers={"Authorization": API_KEY}
        )
        
        if response.status_code == 200:
            teams_data = response.json()
            seen = set()
            unique_players = []
            
            for player in teams_data["data"]:
                player_id = player["player"]["id"]
                
                if player_id not in seen:
                    unique_players.append(player)
                    seen.add(player_id) 
                
            top_10_players = unique_players[:10]
            
            return JsonResponse(top_10_players, safe=False)

    except Exception as e:
        return JsonResponse({"error": f"Error occurred: {str(e)}"}, status=500)

    
class NFLSchedules(APIView):
    def get(self, request):
        url = f"https://api.sportradar.com/nfl/official/trial/v7/en/tournaments/d128603c-516d-4814-83bf-b14085503e1a/schedule.json?api_key={settings.NFL_TEAM_SCHEDULES}"

        headers = {"accept": "application/json"}

        response = requests.get(url, headers=headers)
        return JsonResponse(response.json(), safe=False)
