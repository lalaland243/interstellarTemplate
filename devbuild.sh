docker stop run
docker build -t build .
docker run --rm -dp 3000:3000 --name run build
read -s -n 1 -p "Press any key to continue . . ."
docker stop run