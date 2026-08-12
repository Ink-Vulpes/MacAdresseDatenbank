FROM debian:13
RUN apt-get update && apt-get install -y \
   php-cli \
   curl \
   unzip \
   composer \
   && rm -rf /var/var/lib/apt/lists/*

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
   apt-get install -y \
   wget \
   gnupg \
   lsb-release \
   ca-certificates && \
   wget https://dev.mysql.com/get/mysql-apt-config_0.8.36-1_all.deb && \
   dpkg -i mysql-apt-config_0.8.36-1_all.deb && \
   apt-get update && \
   apt-get install -y mysql-shell && \
   rm -rf /var/lib/apt/lists/*

RUN mkdir /workspace && mkdir /dist && mkdir /dist/www

RUN curl -fsSL https://bun.sh/install | bash