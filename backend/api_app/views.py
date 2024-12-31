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
