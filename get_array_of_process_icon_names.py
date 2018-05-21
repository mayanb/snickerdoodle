#!/usr/bin/env python
from __future__ import print_function
import os,sys
 
path = './public/img'
 
if len(sys.argv) == 2:
    path = sys.argv[1]
 
 
files = os.listdir(path)
icons_array = []
for name in files:
	if '@3x' in name:
		icons_array.append(name)
print (icons_array)

# DUPLICATE/REDUNDANT PROCESSS ICONS (used by some, current soln is to not show them in Icon Picker):
# PURPLE BOX: DS, UBS, nibspack, group, gami, sample, unfoiledbarsample, nibstore, samplebarfoil,
# OTHERS:
# winnow
# rotaryconche
# cook