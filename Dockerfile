FROM public.ecr.aws/lambda/nodejs:20

# RUN npm install

# Copy function code
COPY index.js ${LAMBDA_TASK_ROOT}

EXPOSE 3000
  
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "index.handler" ]