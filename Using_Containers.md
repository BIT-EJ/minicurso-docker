# Using Containers
## Container Port vs Host Port
- your computer has only certain ports available
- your container also has some ports availables
- but you can have as much as you want containers listening to certain port, but not your computer.
- so you need to bind the ports - you do it in your <b>running</b> command
  
## Debugging a Container
- use <code>docker logs</code>
- use <code>docker exec -it containerName /bin/bash</code> to enter inside your Docker Container (interactive terminal)
- 