FROM debian:12

# Install System dep
RUN apt-get update &&\
	apt-get install -y git curl unzip &&\
	rm -rf /var/lib/apt/lists/*

# Install BUN
RUN curl -fsSL https://bun.com/install | bash -s "bun-v1.2.23"


