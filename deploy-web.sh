rm -rf ~/old-deploy/Dianoia-Web

mv ~/Dianoia-Web ~/old-deploy

cd ~ && git clone https://github.com/TruettSeminary/Dianoia-Web.git

cp ~/config/web/.env.production ~/Dianoia-Web

cd ~/Dianoia-Web && npm install

npm run-script build && cp -R ~/Dianoia-Web/build/* /var/www/dianoia.church.technology/html