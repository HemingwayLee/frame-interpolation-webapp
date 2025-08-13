import os
import json
import base64
import subprocess
import traceback
from PIL import Image, ImageOps
from io import BytesIO
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage

@require_http_methods(["GET"])
def list_projects(request):
    directories = []
    try:
        path = f'{settings.MEDIA_ROOT}/projs'
        for entry in os.listdir(path):
            full_path = os.path.join(path, entry)
            if os.path.isdir(full_path):
                directories.append(entry)
    except:
        print(traceback.format_exc())
        
    return JsonResponse({"results": directories})


@csrf_exempt
@require_http_methods(["POST"])
def add_projs(request, folder):
    path = f'{settings.MEDIA_ROOT}/projs/{folder}'
    if os.path.isdir(path):
        return JsonResponse({"result": "folder exist"})
    
    uploadedBeginFile = request.FILES['beginFile'] if 'beginFile' in request.FILES else False
    uploadedEndFile = request.FILES['endFile'] if 'endFile' in request.FILES else False
    if uploadedBeginFile and uploadedEndFile:
        os.makedirs(path, exist_ok=True)

        fss = FileSystemStorage(location=path)
        filename = fss.save(uploadedBeginFile.name, uploadedBeginFile)
        print(f"save... {filename}")

        filename = fss.save(uploadedEndFile.name, uploadedEndFile)
        print(f"save... {filename}")
        
        command = [
            "python3",
            "-m",
            "eval.interpolator_cli",
            "--pattern",
            path,
            "--model_path",
            f'{settings.MEDIA_ROOT}/models/film_net/Style/saved_model/'
            "--times_to_interpolate",
            "5",
            "--output_video"
        ]
        subprocess.run(command, check=True)

        return JsonResponse({"result": "success"})


@require_http_methods(["GET"])
def ping_proj(request, folder):
    

    return JsonResponse({"result": "success"})
