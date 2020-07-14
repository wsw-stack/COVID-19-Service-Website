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
# import matplotlib.pyplot as plt
# import numpy as np
# plt.plot(np.arange(0,len(linelist), 1), result, 'k-')
# plt.xlabel('Number')
# plt.ylabel('Sentiment')
# plt.title('Analysis of Sentiments')
# plt.savefig('Sentiments_wave.png')
# plt.show()

#pyecharts可视化
from pyecharts import options as opts
from pyecharts.charts import Bar
import numpy as np

c = Bar()
x_temp=np.arange(0,len(linelist), 1)
y = result
# x轴
x=x_temp.tolist()
c.add_xaxis(x)
# y轴
c.add_yaxis('Sentiment_score',y)

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
c.set_global_opts(title_opts=opts.TitleOpts(title="微博数据_Sentiments_wave"),
                  # datazoom_opts水平显示，vertical垂直显示
                  # datazoom_opts=opts.DataZoomOpts(orient="vertical")
                  )
#c.render_notebook()
c.render('微博数据_Sentiments_wave.html')