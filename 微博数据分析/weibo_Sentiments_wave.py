# -*- coding: utf-8 -*-
from snownlp import SnowNLP
import codecs
import os
import pandas as pd

#获取情感分数
data = pd.read_csv('weiboComments.csv',usecols=['评论内容'])
lines=str()
linelist=[]
for line in data['评论内容']:
    line = str(line)
    if line.strip()!='':
        lines=lines+line
    else:
        linelist.append(lines)
        lines=str()

linelist  = [x.strip() for x in linelist if x.strip()!='']
#print(linelist)

sentimentslist = []
for i in linelist:
    i=str(i)
    s = SnowNLP(i)
   # print(s.sentiments)
    sentimentslist.append(s.sentiments)

#区间转换为[-0.5, 0.5]
result = []
i = 0
while i<len(sentimentslist):
    result.append(sentimentslist[i]-0.5)
    i = i + 1

#可视化画图
import matplotlib.pyplot as plt
import numpy as np
plt.plot(np.arange(0,len(linelist), 1), result, 'k-')
plt.xlabel('Number')
plt.ylabel('Sentiment')
plt.title('Analysis of Sentiments')
plt.savefig('Sentiments_wave.png')
plt.show()
