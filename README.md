Form.io File Upload Server
-------------------------
This library provides an Upload Server/Proxy for use with the Form.io File Component and URL configuration. 
This allows for Private file upload and downloads by sending Authentication requests to the Form.io API Server
to determine if a user has permissions to upload or download based on their access to either Submit the form, or fetch the Submission JSON respectively.

Getting Started
---------------------
This library can be ran within 3 different environments.

  1.) Locally using Node.js
  2.) Docker container
  3.) AWS Lambda
  
### Running locally with Node.js
In order to run this server locally, you can type the following within your terminal.

  npm install
  node index

### Running within Docker

  
#### Environment Variables. 
You must use Environment variables to configure the runtime operation of this server. When running this server locally using Node.js, you can set the Environment variables within the ```.env``` file. These variables are defined as follows.


| Variable | Description | Default |
|----------|-------------|---------|
| PORT | The port you wish to run the server on. | 4100 |
| MAX_UPLOAD_SIZE | The maximum upload size for files being uploaded. | 16mb |
| DEBUG | Enables debugging | * |
| PROVIDERS | Determines which upload providers are enabled. This is a CSV of the providers you wish to enable. For example "file,alfresco" will enable both local file uploads as well as Alfresco ECM uploads. | file |
| UPLOAD_DIR | When using the "file" provider, this is the local upload base directory. | providers/uploads |
| ALFRESCO_USER | When using the Alfresco provider, this is the user account to log into the Alfresco ECM | admin |
| ALFRESCO_PASS | When using the Alfresco provider, this is the user account password to log into the Alfresco ECM | admin |
| ALFRESCO_HOST | When using the Alfresco provider, this is the Alfresco ECM server URL | http://127.0.0.1:8082 |

