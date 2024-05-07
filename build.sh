docker buld -t build .
docker run --rm -dp 3000:3000 --name run build
clear
echo "PDF Viewer is up!"
