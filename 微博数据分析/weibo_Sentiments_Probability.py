# -*- coding: utf-8 -*-
from snownlp import SnowNLP
import codecs
import os
import pandas as pd
import jieba

data = pd.read_csv('weiboComments.csv',usecols=['评论内容'])
lines=str()
final_list = data.values.tolist()
for line in data['评论内容']:
    line = str(line)
    lines=lines+line
#print(final_list)
sentimentslist = []
for i in final_list:
    i=str(i)
    s = SnowNLP(i)
   # print(s.sentiments)
    sentimentslist.append(s.sentiments)

import matplotlib.pyplot as plt
import numpy as np
plt.hist(sentimentslist, bins = np.arange(0, 1, 0.01), facecolor = 'g')
plt.xlabel('Sentiments score')
plt.ylabel('Quantity')
plt.title('Analysis of Sentiments')
plt.savefig('Sentiments Probability.png')
plt.show()
