#!/usr/bin/env python
import sys
import os, time, sys

pipe_name = '/var/www/html/ardubot/python/tray' 
pipe_name2 ='/var/www/html/ardubot/python/answer'
#pipe_name = '/Applications/XAMPP/xamppfiles/htdocs/ardubot/python/tray'
#pipe_name2 = '/Applications/XAMPP/xamppfiles/htdocs/ardubot/python/answer'

trayectoria=[]
debugueable = " "

def generateCoordenates ():
 
	dimX = 672
	dimY = 672

	gridX = 8
	gridY = 8


	centX=(dimX/gridX)/2
	centY=(dimY/gridY)/2

	coords = sys.argv[1];
	coords = coords[1:];
	coords = coords[:-1];
	coords = coords.split(",");

	#print "Coordenadas iniciales" + coords[0] + " "+coords[1]

	coordX = int(coords[0]);
	coordY = int(coords[1]);

	i=0
	trayectoria.append('[');
	trayectoria.append((((dimX/gridX)*coordX)+centX,((dimY/gridY)*coordY)+centY))
	debugueable = "Generamos trayectorias:"
	for ent in sys.argv:
		if i>1:
			trayectoria.append(',')
			if "w" in ent:
				coordY-=1
			elif "s" in ent:
				coordY+=1
			elif "a" in ent:
				coordX-=1
			elif "d" in ent:
				coordX+=1
			trayectoria.append((((dimX/gridX)*coordX)+centX,((dimY/gridY)*coordY)+centY))
		i+=1
		debugueable += "trayectoria generada"
	#print debugueable
	trayectoria.append(']');

def sendRoad ():
	debugueable = "Pipe to be created"
	if not os.path.exists(pipe_name):
		try:
			os.mkfifo(pipe_name, 0777)
		except Exception,e: 
			debugueable += "MKFifo: " + str(e)
	if os.access(pipe_name, os.O_WRONLY):
		debugueable += "is writable!"
	try:
		pipeout = os.open(pipe_name, os.O_WRONLY)
	except Exception,e: 
		debugueable += "Open: " + str(e)
	counter = 0
	debugueable += "Init of sleep"
	time.sleep(1)
	debugueable += "End of sleep"
	str1 = ''.join(str(e) for e in trayectoria)
	print "trayectoria: "+str1
	os.write(pipeout, str1)
	debugueable += "Fin sendRoad" 
	os.close(pipeout)

	#print debugueable


def waitForAnswer():
	if not os.path.exists(pipe_name2):
		os.mkfifo(pipe_name2)  

	pipein = open(pipe_name2, 'r')

	while True:
		line = pipein.readline()
		if line=="OK":
			return;



generateCoordenates()
sendRoad()
#waitForAnswer()


 