FROM debian:13
RUN apt-get update && apt-get install -y \
   php-cli \
   curl \
   unzip \
   composer \
   && rm -rf /var/var/lib/apt/lists/*

RUN mkdir /workspace

RUN curl -fsSL https://bun.sh/install | bash