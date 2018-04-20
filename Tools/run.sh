#!/bin/sh
sitetype=$1
articletype=$2
articlename=$3
filepath='/usr/share/nginx/markdown/editor.md/md_articles/'$sitetype'/'$articletype'/'$articlename
echo $filepath
copyfilepath=''

if [ $sitetype == 'BLOG' ]; then
    copyfilepath="/home/bearboyxu/MyBlogFactory/myblog/FantBoy.github.io/_posts/"
    cp $filepath $copyfilepath
    cd /home/bearboyxu/MyBlogFactory/myblog/FantBoy.github.io/
    /usr/local/bin/jekyll build
    rm -r /usr/share/nginx/site/*
    cp -r _site/* /usr/share/nginx/site/
    mv $filepath '/usr/share/nginx/markdown/editor.md/md_articles/'$sitetype'/POST/'$articlename
    echo 'ok'
elif [ $sitetype == 'WIKI' ]; then
    copyfilepath='/home/bearboyxu/MyBlogFactory/WikiSite/source/_posts/'
    cp $filepath $copyfilepath
    cd /home/bearboyxu/MyBlogFactory/WikiSite/
    hexo clean
    hexo g
    #hexo deploy
    rm -R /usr/share/nginx/wiki/
    cp -R /home/bearboyxu/MyBlogFactory/WikiSite/public/ /usr/share/nginx/wiki/
    mv $filepath '/usr/share/nginx/markdown/editor.md/md_articles/'$sitetype'/POST/'$articlename
    echo 'ok'
fi




