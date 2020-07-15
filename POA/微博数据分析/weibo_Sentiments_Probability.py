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

#matplotlib可视化
# import matplotlib.pyplot as plt
# import numpy as np
# plt.hist(sentimentslist, bins = np.arange(0, 1, 0.01), facecolor = 'g')
# plt.xlabel('Sentiments score')
# plt.ylabel('Quantity')
# plt.title('Analysis of Sentiments')
# plt.savefig('Sentiments Probability.png')
# plt.show()

#pyecharts可视化
from pyecharts import options as opts
from pyecharts.charts import Bar
import numpy as np


(n,bins)=np.histogram(sentimentslist,100,range=(0,1))

c = Bar()
y = n.tolist()
x=bins.tolist()
# x轴
c.add_xaxis(x)
# y轴
c.add_yaxis('Quantity',y)

# reversal_axis方法是反转xy轴
# c.reversal_axis()
# False则不显示y轴的值，默认为显示
c.set_series_opts(label_opts=opts.LabelOpts(is_show=False),
                  #markpoint_opts指定类型
             #      markpoint_opts=opts.MarkPointOpts(
             #            data = [
             #                opts.MarkPointItem(type_="max", name="最大值"),
             #                opts.MarkPointItem(type_="min", name="最小值"),
             #                 ]
             # )
)
c.set_global_opts(title_opts=opts.TitleOpts(title="微博数据_Sentiments_Probability"),
                  # datazoom_opts水平显示，vertical垂直显示
                  # datazoom_opts=opts.DataZoomOpts(orient="vertical")
                  )
#c.render_notebook()
c.render('微博数据_Sentiments_Probability.html')