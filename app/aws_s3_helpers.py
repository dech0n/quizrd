import boto3
import botocore
import os
import uuid  # for creating unique IDs

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)

BUCKET_NAME = os.environ.get("S3_BUCKET")
# the bucket's location within AWS
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

# TODO: add audio file extensions to this list
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
    '''
    Validates whether a filename contains a dot
    to separate the filename from its extension
    and whether the extension is allowed.
    '''
    # rsplit starts from the right (end) of the string
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    '''
    Uses uuid to generate a random, unique UUID
    to replace the original filename,
    then attaches the original extension.
    '''
    ext = filename.rsplit(".", 1)[1].lower()
    # uuid4 = generate random uuid (vs one from a hash), hex = make it a string
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    '''
    Uploads the file to AWS and, upon success,
    returns a dictionary with a key of "url" and a value
    of the image URL.

    Upon failure, returns a dictionary with a key of "error"
    and a string value of the exception.
    '''
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the s3 upload fails
        return {"errors": str(e)}
    return {"url": f"{S3_LOCATION}{file.filename}"}
