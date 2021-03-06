# coding=utf-8
import jieba
import re
import time
from collections import Counter
import pandas as pd
import datetime

#------------------------------------中文分词------------------------------------
#截取该日期前后的10%文章
#percent = 0-90
def generatewordData(percent):
    cut_words = ""
    all_words = ""

    data = pd.read_csv('中国社会组织_疫情防控.csv')

    percent = percent / 10
    num = data.shape[0]/10
    data = data.iloc[int(num*percent):int(num*percent+num),]
    #print(data.shape[0])
    #print(list(data['时间'])[0])
    #print(list(data['时间'])[-1])

    for line in data['正文内容']:
        line = str(line)
        seg_list = jieba.cut(line,cut_all=False)
        cut_words = (" ".join(seg_list))
        all_words += cut_words


    # 输出结果
    all_words = all_words.split()

    # 词频统计
    c = Counter()
    for x in all_words:
        if len(x)>1 and x != '\r\n':
            c[x] += 1

    words = []
    for (k,v) in c.most_common(50):
        # print(k, v)
        words.append((k,v))
    words = words[1:]
    return words,list(data['时间'])[-1],list(data['时间'])[0]

# 渲染图

from pyecharts  import options as opts
from pyecharts.charts import WordCloud
from pyecharts.globals import SymbolType

from pyecharts.charts import  Timeline
from pyecharts.faker import Faker
#import wordData

# percent 0-90
def render_wordcloud(percent = 0) -> WordCloud:
    from wordData import date_data
    words = date_data[int(percent)][0]
    c = (
        WordCloud()
        .add("", words, word_size_range=[20, 100], shape=SymbolType.ROUND_RECT)
        .set_global_opts(title_opts=opts.TitleOpts(pos_left='center',title='新型冠状病毒疫情新闻词云图'+' '+date_data[int(percent)][1]+' - '+date_data[int(percent)][2]))
    )
    return c

#生成图
if __name__ == "__main__":
    date_words = []
    for i in range(0,91):
        #print(i)
        words,date_start,date_end = generatewordData(i)
        date_words.append([words,date_start,date_end])
    with open("wordData.py",'w',encoding='utf-8') as f:
        f.write("date_data="+str(date_words))
        f.close()

    # #测试
    # for i in range(0,91):
    #     render_wordcloud(i).render('wordcloud%d.html'%(i+1))

    #timeline
    from wordData import date_data
    attr = Faker.choose()
    tl = Timeline()



    #tl.add_schema(label_opts= opts.LabelOpts( is_show=False))
    for i in range(0,11):
        #tl.add(render_wordcloud(i), "{}".format(i))
        tl.add(render_wordcloud(90-9*i),'{}'.format(date_data[90-int(i)*9][1]+' - '+date_data[90-int(i)*9][2]))
    tl.render("中国社会组织疫情防控平台_wordcloud.html")