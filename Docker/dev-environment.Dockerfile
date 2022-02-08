FROM python:3.10-slim-bullseye

RUN apt update
RUN apt install -y zsh
RUN apt install -y git

RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs


RUN useradd -u 1000 -o -s /bin/zsh vscode
RUN mkdir -p /workspace
RUN chown -R vscode /workspace
RUN sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" --unattended
COPY Docker/gitconfig /home/vscode/.gitconfig
# Uses "git", "ssh-agent" and "history-substring-search" bundled plugins
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
    -p git -p ssh-agent -p 'history-substring-search' \
    -a 'bindkey "\$terminfo[kcuu1]" history-substring-search-up' \
    -a 'bindkey "\$terminfo[kcud1]" history-substring-search-down'
RUN chown -R vscode /home/vscode

COPY app-requirements.txt ./
RUN pip install -r app-requirements.txt

# Setup for robot framework
RUN apt-get update \
    && apt-get install -y xvfb wget ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 \
    libatspi2.0-0 libcups2 libdbus-1-3 libgbm1 libgtk-3-0 libnspr4 libnss3 \
    libxcomposite1 libxkbcommon0 libxrandr2 xdg-utils ntpdate openssl libcurl4 unzip gnupg

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get -y update
RUN apt-get -y install procps
RUN apt-get install -y google-chrome-stable

RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

COPY dev-requirements.txt ./
RUN pip install -r dev-requirements.txt

# set display port to avoid crash
ENV DISPLAY=:99
ENV PYTHONPATH='/workspace/testing/libraries'

WORKDIR /workspace

