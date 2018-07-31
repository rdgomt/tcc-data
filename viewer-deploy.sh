cd viewer

git add .

msg="Rebuilding viewer `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

git push origin master

cd ..

git add .

msg="Rebuilding viewer `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

git push origin master