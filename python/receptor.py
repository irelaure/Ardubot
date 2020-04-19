import os, time, sys
pipe_name = '/var/www/html/ardubot/python/tray' 
pipe_name2 = '/var/www/html/ardubot/python/answer' 
# pipe_name = '/Applications/XAMPP/xamppfiles/htdocs/ardubot/python/tray'
# pipe_name2 = '/Applications/XAMPP/xamppfiles/htdocs/ardubot/python/answer'


def answer():
	debugueable = "Pipe to be created"
	if not os.path.exists(pipe_name2):
		try:
			os.mkfifo(pipe_name2, 0777)
		except Exception,e: 
			debugueable += "MKFifo: " + str(e)

	if os.access(pipe_name2, os.O_WRONLY):
		debugueable += "is writable!"

	try:
		pipeout = os.open(pipe_name2, os.O_WRONLY)
	except Exception,e: 
		debugueable += "Open: " + str(e)

	counter = 0
	debugueable += "Init of sleep"
	time.sleep(1)
	debugueable += "End of sleep"
	str1="OK"
	os.write(pipeout, str1)
	debugueable += "Fin sendRoad" 
	os.close(pipeout)
	print debugueable
	print str1


def receive():
	if not os.path.exists(pipe_name):
		os.mkfifo(pipe_name)  

	pipein = open(pipe_name, 'r')

	while True:
		line = pipein.readline()
		if line:
			print 'Reciever got "%s" ' % (line)
			#answer()

receive()


