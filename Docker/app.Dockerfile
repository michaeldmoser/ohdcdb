FROM python:3.10-slim-bullseye

RUN apt update
RUN apt install -y zsh
RUN apt install -y npm && apt install -y nodejs

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

WORKDIR /workspace

CMD python manage.py runserver

