set -e

yarn docs:build

cd docs/.vitepress/dist


git init  #执行这些git命令
git add -A
git commit -m 'deploy'
git branch -M main
git remote add origin git@github.com:SimpleMw/vitepress-blog.git
git push -u origin main

cd ..
 
rm -rf docs/.vitepress/dist  #删除dist文件夹


#已经在仓库中存在
yarn docs:build
cd docs/.vitepress/dist
git remote add origin git@github.com:SimpleMw/vitepress-blog-page.git
git pull
git commit -m 'update'
git branch -M main
git push -u origin main
cd ..
rm -rf docs/.vitepress/dist  #删除dist文件夹
