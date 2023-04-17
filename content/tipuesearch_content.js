var tipuesearch = {"pages": [{'title': 'About', 'text': '組長：41023119 呂承劼 \n 組員：41023114 王樟皓、41023126 卓桓琮、41023138 林敬燐 \n 倉儲 : \xa0 https://github.com/mdecd2023/2a2-pj1ag2 \n 網站 : \xa0 https://mdecd2023.github.io/2a2-pj1ag2/content/index.html \n https://mde.tw/pjcopsim \n', 'tags': '', 'url': 'About.html'}, {'title': 'pj1', 'text': '3/30 已完成場地及感測器 \n \n 4/14 完成記分板程式 \n \n 4/14 可進行計分 \n 觸碰到感測器球及機器人會重置到原本的位置 \n \n 在錄影時記分板不會顯示出來-附上圖片 \n \n 當分數為5分時，會暫停模擬 \n \n 在製作感測器時求記得把 collidable、measurable、detectable 這三個選項打開 \n \n 另外要注意的是感測器 z軸的部分不能為0，否則感測器會直接偵測到地板導致程式暫停模擬 \n 記分板程式註解 \n function sysCall_init()\n    score1 = 0 -- 初始化一個名為score1的變數，值為0\n    \n    sensor = sim.getObject(\'./sensor\') -- 從模擬場景中獲取一個名為sensor的物體\n    \n    -- 創建一個UI，包括標題、計分標籤和當前分數值標籤，使用plastique風格\n    xml = [[\n        <ui title="Scoreboard" closeable="false" resizable="false" style="plastique">\n        <label text="Score:" style="* {background-color: #808080; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px; }" id="10"/>\n        <label text="0" style="* {background-color: #FFF; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px;}" id="30"/>\n     \n        </ui>\n    ]]\n    ui = simUI.create(xml) -- 創建UI\n    simUI.setPosition(ui, 0,0, true) -- 將UI定位在屏幕左上角\n    bubbleRob = sim.getObject(\'/bubbleRob\') -- 從模擬場景中獲取名為bubbleRob的物體句柄\n    ball = sim.getObject(\'/ball\') -- 從模擬場景中獲取名為ball的物體句柄\n    bubbleRob2 = sim.getObject(\'/bubbleRob2\') -- 從模擬場景中獲取名為bubbleRob2的物體句柄\n    initialPosition = sim.getObjectPosition(bubbleRob, -1) -- 獲取bubbleRob物體的初始位置\n    initialOrientation = sim.getObjectOrientation(bubbleRob, -1) -- 獲取bubbleRob物體的初始方向\n    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1) -- 獲取bubbleRob2物體的初始位置\n    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1) -- 獲取bubbleRob2物體的初始方向\n    initialballPosition = sim.getObjectPosition(ball, -1) -- 獲取ball物體的初始位置\n    initialballOrientation = sim.getObjectOrientation(ball, -1) -- 獲取ball物體的初始方向\n\nend\n\nfunction sysCall_actuation()\n    --simUI.setLabelText(ui, 30, tostring(sim.getFloatSignal("myVariable")))\n\n    -- 讀取接近傳感器的距離值，將其存儲在result變數中\n    result=sim.readProximitySensor(sensor)\n\n    -- 如果分數小於5，則執行以下操作\n    if(score1<5)then\n\n        -- 如果檢測到接近物體，則執行以下操作\n        if(result>0)then\n            -- 將score1變數增加1\n            score2 = score1+1\n\n            -- 在UI中更新分數值標籤的文本為score2\n            simUI.setLabelText(ui, 30, tostring(score2))\n\n            -- 重置bubbleRob、bubbleRob2和ball物體的位置和方向\n            sim.setObjectPosition(bubbleRob, -1, initialPosition)\n            sim.setObjectOrientation(bubbleRob, -1, initialOrientation)\n            sim.setObjectPosition(bubbleRob2, -1, initialPosition2)\n            sim.setObjectOrientation(bubbleRob2, -1, initialOrientation2)\n            sim.setObjectPosition(ball, -1, initialballPosition)\n            sim.setObjectOrientation(ball, -1, initialballOrientation)\n\n            -- 將score1設置為score2\n            score1=score2\n        end\n    else\n        -- 如果分數達到5，則暫停模擬\n        sim.pauseSimulation()\n    end\nend \n 倒數計時器程式註解 \n -- 初始化函數，初始化得分(score1)為0和計時器(count)為3600\nfunction sysCall_init()\n    -- initialize the score to 0\n    score1 = 0 -- 初始化得分\n    count = 3600 -- 初始化計時器\n    -- 獲取接近傳感器對象並創建UI界面\n    sensor = sim.getObject(\'./sensor\')\n    xml = [[\n            <ui title="Scoreboard" closeable="false" resizable="false" style="plastique">\n              <label text="60:00.0" style="* {background-color: #F00; color: #FFF; font-size: 32px; font-weight: bold; padding: 4px; border-radius: 4px;}" id="10"/>\n              <label text="Score:" style="* {background-color: #808080; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px; }" id="20"/>\n              <label text="0" style="* {background-color: #FFF; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px;}" id="30"/>\n            </ui>\n          ]]\n    ui = simUI.create(xml)\n    simUI.setPosition(ui, 0, 0, true)\n    -- 獲取對象及其初始位置/方向\n    bubbleRob = sim.getObject(\'/bubbleRob\')\n    ball = sim.getObject(\'/ball\')\n    initialPosition = sim.getObjectPosition(bubbleRob, -1)\n    initialOrientation = sim.getObjectOrientation(bubbleRob, -1)\n    initialballPosition = sim.getObjectPosition(ball, -1)\n    initialballOrientation = sim.getObjectOrientation(ball, -1)\n    \nend\n\nfunction sysCall_actuation() -- 讀取接近傳感器值\n    result=sim.readProximitySensor(sensor)\n    -- 檢查得分是否小於5\n    if(score1<5)then\n        -- 檢查接近傳感器是否檢測到某物\n        if(result>0)then\n            -- 增加得分並更新UI標籤\n            score2 = score1+1\n            simUI.setLabelText(ui, 30, tostring(score2))\n            -- 重置對象的位置和方向\n            sim.setObjectPosition(bubbleRob, -1, initialPosition)\n            sim.setObjectOrientation(bubbleRob, -1, initialOrientation)\n            sim.setObjectPosition(ball, -1, initialballPosition)\n            sim.setObjectOrientation(ball, -1, initialballOrientation)\n            -- 更新得分變量\n            score1=score2\n        end\n    end\n    if count > 0 then -- 檢查計時器是否大於0\n          count = count - 1 -- 減少倒數時間\n          local minutes = math.floor(count / 60) -- 計算分鐘\n          local seconds = count % 60 -- 計算秒數\n          local timeStr = string.format("%d:%02d", minutes , seconds) -- 格式化時間字符串\n          simUI.setLabelText(ui, 10, timeStr) -- 更新時間UI標籤\n          simUI.setLabelText(ui, 30, tostring(score1)) -- 更新score的UI標籤\n    else\n        -- 如果時間到會暫停模擬\n        sim.pauseSimulation()\n    end\nend \n 可以將倒數計時器顯示出來，但計時器所減少的時間會比正常時間快好幾倍 \n \n bubbleRob_football 檔案 :  bubbleRob_football_pj1ag10 \n 加入連線對戰 bubbleRob_football 檔案 :  bubbleRob_football-2_pj1ag10 \n \n 連線remoteAPI程式註解 \n # 引入必要的模块\nfrom zmqRemoteApi import RemoteAPIClient\nimport keyboard\nimport sim\nimport time\nimport simConst\n\n# 打印程式啟動的訊息\nprint(\'Program started\')\n\n# 關閉所有已開啟的連線\nsim.simxFinish(-1)\n\n# 連接到遠端 API 伺服器\nclientID = sim.simxStart(\'192.168.56.1\', 19998, True, True, 5000, 5)\n\n# 啟動仿真\nsim.simxStartSimulation(clientID, sim.simx_opmode_oneshot_wait)\n\n# 判斷是否成功連線到伺服器\nif clientID != -1:\n    print(\'Connected to remote API server\')\nelse:\n    print(\'Failed connecting to remote API server\')\n\n# 打印仿真開始的訊息\nprint(\'Simulation started\')\n\n# 取得左右輪子的控制句柄\nerrorCode, leftMotor = sim.simxGetObjectHandle(clientID, \'leftMotor2\', sim.simx_opmode_oneshot_wait)\nerrorCode, rightMotor = sim.simxGetObjectHandle(clientID, \'rightMotor2\', sim.simx_opmode_oneshot_wait)\n\n# 設定 BubbleRob 的速度\ndef setBubbleRobVelocity(leftWheelVelocity, rightWheelVelocity):\n    # 取得左右輪子的控制句柄\n    errorCode, leftMotor = sim.simxGetObjectHandle(clientID, \'/leftMotor2\', sim.simx_opmode_oneshot_wait)\n    errorCode, rightMotor = sim.simxGetObjectHandle(clientID, \'/rightMotor2\',sim.simx_opmode_oneshot_wait)\n    # 設定左右輪子的目標速度\n    sim.simxSetJointTargetVelocity(clientID, leftMotor, leftWheelVelocity, simConst.simx_opmode_streaming)\n    sim.simxSetJointTargetVelocity(clientID, rightMotor, rightWheelVelocity, simConst.simx_opmode_streaming)\n\n# 循環檢測鍵盤事件\nwhile True:\n    if keyboard.is_pressed(\'up\'):\n        # 按下"上"鍵，前進\n        setBubbleRobVelocity(2.0, 2.0)\n    elif keyboard.is_pressed(\'down\'):\n        # 按下"下"鍵，後退\n        setBubbleRobVelocity(-2.0, -2.0)\n    elif keyboard.is_pressed(\'left\'):\n        # 按下"左"鍵，左轉\n        setBubbleRobVelocity(-2.0, 2.0)\n    elif keyboard.is_pressed(\'right\'):\n        # 按下"右"鍵，右轉\n        setBubbleRobVelocity(2.0, -2.0)\n    elif keyboard.is_pressed(\'q\'):\n        # 按下"q"鍵，停止仿真\n        sim.stopSimulation()\n    else:\n        # 沒有按下任何鍵，停止移動\n        setBubbleRobVelocity(0.0, 0.0) \n 此程式必須放在圖片紅色框框檔案中 \n \n 啟動遠端API程式註解 \n -- The main script is not supposed to be modified, except in special cases.\nrequire(\'defaultMainScript\')\nfunction sysCall_init()\nsimRemoteApi.start(19998) -- 啟動遠程 API，監聽端口號為 19998\nend \n 連線 API sensor 程式註解 \n --在這個函數中初始化變數，設置UI元素，並獲取物體的初始位置和方向\nfunction sysCall_init()\nscore1 = 0 --初始化分數變量\ncount = 24000 --初始化計時器變量，代表比賽時間，這裡設置為24000，即400秒\nsensor = sim.getObject(\'./sensor\') --獲取名為"sensor"的接近傳感器\n--創建UI元素，顯示分數和計時器\nxml2 = [[\n<ui title="計分板" closeable="false" resizable="false" style="plastique">\n<label text="分數：" style="* {background-color: #808080; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px; }" id="20"/>\n<label text="0" style="* {background-color: #FFF; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px;}" id="30"/>\n</ui>\n]]\nui = simUI.create(xml2) --創建計分板UI\nsimUI.setPosition(ui, 0,0, true) --設置UI位置\nxml3 = [[\n<ui title="計時器" closeable="false" resizable="false" style="plastique">\n<label text="400:00.0" style="* {background-color: #F00; color: #FFF; font-size: 32px; font-weight: bold; padding: 4px; border-radius: 4px;}" id="10"/>\n</ui>\n]]\nui2 = simUI.create(xml3) --創建計時器UI\nsimUI.setPosition(ui2, 900,0, true) --設置UI位置\n--獲取機器人和球的句柄，以及它們的初始位置和方向\nbubbleRob = sim.getObject(\'/bubbleRob\')\nball = sim.getObject(\'/ball\')\nbubbleRob2 = sim.getObject(\'/bubbleRob2\')\ninitialPosition = sim.getObjectPosition(bubbleRob, -1)\ninitialOrientation = sim.getObjectOrientation(bubbleRob, -1)\ninitialPosition2 = sim.getObjectPosition(bubbleRob2, -1)\ninitialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)\ninitialballPosition = sim.getObjectPosition(ball, -1)\ninitialballOrientation = sim.getObjectOrientation(ball, -1)\nend\n\n--在這個函數中實現比賽計時和計分邏輯\nfunction sysCall_actuation() -- 讀取接近傳感器值\n    result=sim.readProximitySensor(sensor)\n    -- 檢查得分是否小於5\n    if(score1<5)then\n        -- 檢查接近傳感器是否檢測到某物\n        if(result>0)then\n            -- 增加得分並更新UI標籤\n            score2 = score1+1\n            simUI.setLabelText(ui, 30, tostring(score2))\n            -- 重置對象的位置和方向\n            sim.setObjectPosition(bubbleRob, -1, initialPosition)\n            sim.setObjectOrientation(bubbleRob, -1, initialOrientation)\n            sim.setObjectPosition(bubbleRob2, -1, initialPosition2)\n            sim.setObjectOrientation(bubbleRob2, -1, initialOrientation2)\n            sim.setObjectPosition(ball, -1, initialballPosition)\n            sim.setObjectOrientation(ball, -1, initialballOrientation)\n            -- 更新得分變量\n            score1=score2\n        end\n    end\n    if count > 0 then -- 檢查計時器是否大於0\n          count = count - 1 -- 減少倒數時間\n          local minutes = math.floor(count / 60) -- 計算分鐘\n          local seconds = count % 60 -- 計算秒數\n          local timeStr = string.format("%d:%02d", minutes , seconds) -- 格式化時間字符串\n          simUI.setLabelText(ui, 10, timeStr) -- 更新時間UI標籤\n          simUI.setLabelText(ui, 30, tostring(score1)) -- 更新score的UI標籤\n    else\n        -- 如果時間到會暫停模擬\n        sim.pauseSimulation()\n    end\nend \n 連線 API sensor2 程式註解 \n function sysCall_init()\n        score1 = 0 -- 初始分數為 0\n        sensor = sim.getObject(\'./sensor2\')  -- 取得感測器物件\n        xml = [[\n             <ui title="Scoreboard" closeable="false" resizable="false" style="plastique">\n             <label text="Score:" style="* {background-color: #808080; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px; }" id="40"/>\n             <label text="0" style="* {background-color: #FFF; color: #000000; font-size: 40px; font-weight: bold; padding: 5px; border-radius: 5px;}" id="50"/>\n              </ui>\n        ]]  -- 創建 UI 界面\n        ui = simUI.create(xml)  -- 顯示 UI 界面\n        simUI.setPosition(ui, 1770,0, true)  -- 設定 UI 界面的位置\n        bubbleRob = sim.getObject(\'/bubbleRob\')  -- 取得 BubbleRob 物件\n        ball = sim.getObject(\'/ball\')  -- 取得球物件\n        bubbleRob2 = sim.getObject(\'/bubbleRob2\')  -- 取得第二個 BubbleRob 物件\n        initialPosition = sim.getObjectPosition(bubbleRob, -1)  -- 取得 BubbleRob 初始位置\n        initialOrientation = sim.getObjectOrientation(bubbleRob, -1)  -- 取得 BubbleRob 初始方向\n        initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)  -- 取得第二個 BubbleRob 初始位置\n        initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)  -- 取得第二個 BubbleRob 初始方向\n        initialballPosition = sim.getObjectPosition(ball, -1)  -- 取得球的初始位置\n        initialballOrientation = sim.getObjectOrientation(ball, -1)  -- 取得球的初始方向\nend\n\nfunction sysCall_actuation()\n     --simUI.setLabelText(ui, 30, tostring(sim.getFloatSignal("myVariable")))\n     result=sim.readProximitySensor(sensor) -- 讀取感測器的值\n     if(score1<5)then -- 如果分數小於 5 分\n       if(result>0)then -- 如果感測器的值大於 0\n        score2 = score1+1 -- 分數加 1\n        simUI.setLabelText(ui, 50, tostring(score2)) -- 更新分數顯示\n        sim.setObjectPosition(bubbleRob, -1, initialPosition)  -- 將 BubbleRob 重置到初始位置\n        sim.setObjectOrientation(bubbleRob, -1, initialOrientation)  -- 將 BubbleRob 重置到初始方向\n        sim.setObjectPosition(bubbleRob2, -1, initialPosition2)  -- 將第二個 BubbleRob 重置到初始位置\n        sim.setObjectOrientation(bubbleRob2, -1, initialOrientation2)  -- 將第二個 BubbleRob 重置到初始方向\n        sim.setObjectPosition(ball, -1, initialballPosition)  -- 將 Ball 重置到初始位置\n        sim.setObjectOrientation(ball, -1, initialballOrientation)  -- 將 Ball 重置到初始方向\n        -- 將score1設置為score2\n        score1=score2\n        end\n    else\n        -- 如果分數達到5，則暫停模擬\n        sim.pauseSimulation()\n    end\nend \n \n 所有檔案壓縮檔： bubbleRob football 2a-pj1ag10.7z', 'tags': '', 'url': 'pj1.html'}, {'title': 'Brython', 'text': 'https://en.wikipedia.org/wiki/Python_(programming_language) \n Examples: \n https://gist.github.com/mdecycu/d9082d678096bd58378d6afe2c7fa05d \n https://www.geeksforgeeks.org/python-programming-examples/ \n https://www.programiz.com/python-programming/examples \n https://www.freecodecamp.org/news/python-code-examples-sample-script-coding-tutorial-for-beginners/ \n Python Tutorial: \n https://docs.python.org/3/tutorial/ \n An informal introduction to Python \n Indentation (Python 採 4 個 Spaces 縮排, 以界定執行範圍) \n Variables ( Python Keywords ) \n Comments (# 單行註解, 三個單引號或三個雙引號標註多行註解) \n Numbers  (整數 int(), 浮點數 float()) \n Strings  (字串) \n print (Python 內建函式,  print()  函式) \n Python control flow tools \n for \n if \n range \n open \n read \n lists \n tuples \n dictionaries \n functions \n try ... except \n break \n pass \n classes \n 這個頁面 demo 如何在同一頁面下納入多個線上 Ace 編輯器與執行按鈕 ( practice_html.txt  動態頁面超文件). \n practice_html.txt  動態頁面超文件應該可以在啟動 Brython 時, 設定將 .py 檔案放入 downloads/py 目錄中引用. \n 亦即將所有對應的 html 也使用 Brython 產生, 然後寫為  class  後, 在範例導入時透過  instance  引用. \n <!-- 啟動 Brython -->\n<script>\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\',\'./../downloads/py/\']});\n}\n</script> \n 從 1 累加到 100: \n 1 add to 100 \n 將 iterable 與 iterator  相關說明 , 利用 Brython 與 Ace Editor 整理在這個頁面. \n  導入 brython 程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src1"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n \n \n \n  add 1 to 100 開始  \n \n \n  add 1 to 100 結束 \n  editor1 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor1 結束  \n \n  ##########################################  \n 從 1 累加到 100 part2: \n 1 add to 100 cango_three_gears BSnake AI Tetris Rotating Block \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src2"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  add 1 to 100 part2 開始  \n \n \n  add 1 to 100 part2 結束 \n  editor2 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor2 結束  \n \n \n \n \n', 'tags': '', 'url': 'Brython.html'}, {'title': 'Brython_ex2', 'text': 'This code uses the Euler method to approximate the solution to the ODE dy/dx = x - y with an initial condition of y0 = 1.0. The solution is calculated for a range of x values from 0 to 5. \n \n \n \n \n \n \n Solve ODE: \n from browser import document\n\ndef dy_dx(y, x):\n    return x - y\n\nx_start = 0\nx_end = 5\nn_points = 100\nx = [x_start + i * (x_end - x_start) / (n_points - 1) for i in range(n_points)]\ny0 = 1.0\nh = x[1] - x[0]\ny = [y0]\nfor i in range(1, len(x)):\n    y.append(y[-1] + h * dy_dx(y[-1], x[i-1]))\n\n# Create a new paragraph element and set its text content to the solution\np = document.createElement(\'p\')\np.textContent = f"The solution to the ODE is: {y}"\n\n# Append the paragraph element to the body of the webpage\ndocument.body.appendChild(p) \n \n \n \n \n \n Brython environment and  Plotly.js : \n <script src="./../cmsimde/static/brython.js"></script>\n<script src="./../cmsimde/static/brython_stdlib.js"></script>\n<script>// <![CDATA[\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\']});\n}\n// ]]></script>\n<p id="brython_div"></p> \n Brython programe with Plotly.js: \n from browser import document, window\n\ndef dy_dx(y, x):\n    return x - y\n\nx_start = 0\nx_end = 5\nn_points = 100\nx = [x_start + i * (x_end - x_start) / (n_points - 1) for i in range(n_points)]\ny0 = 1.0\nh = x[1] - x[0]\ny = [y0]\nfor i in range(1, len(x)):\n    y.append(y[-1] + h * dy_dx(y[-1], x[i-1]))\n\n# Create a new div element to hold the plot\n#plot_div = document.createElement(\'div\')\n#plot_div.id = \'plot\'\n#document.body.appendChild(plot_div)\nplot_div = document["brython_div"]\n\n# Plot the solution using plotly.js\ndata = [{\'x\': x, \'y\': y}]\nwindow.Plotly.newPlot(\'brython_div\', data) \n This code defines a function dy_dx that represents the mass-spring-damper ordinary differential equation. The Euler method is used to solve this equation for a range of x values from 0 to 20 with initial conditions of y0 = [1.0, 0.0]. The solution is then plotted on the webpage using  plotly.js . \n \n \n \n \n This code defines a function dy_dx that represents the mass-spring-damper system with a PID controller. The gains of the PID controller are set to Kp = 10.0, Ki = 1.0, and Kd = 0.5. The Euler method is used to solve this system of equations for a range of x values from 0 to 20 with initial conditions of y0 = [0.0, 0.0, 0.0, 0.0]. The response of the system is then plotted on the webpage using  plotly.js . \n \n \n \n \n \n \n \n \n', 'tags': '', 'url': 'Brython_ex2.html'}]};