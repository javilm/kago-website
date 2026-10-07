# Dockerfile - the image that serves kago.tools: nginx with public/
# as it stands. Built and pushed by "make image".

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY public/ /usr/share/nginx/html/

# nginx's own error page would otherwise answer at /50x.html. Files
# copied into the site can be readable by their owner only; the web
# server runs as another user and must be able to read every one.
RUN rm /usr/share/nginx/html/50x.html && \
    chmod -R a+rX /usr/share/nginx/html
