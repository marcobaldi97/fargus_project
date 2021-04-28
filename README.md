# fargus_project
 This project is intended to show skills I'm learning.

Tutorial:
Open two consols:
1º Console:cd .\client\;npm run start
2º Console:cd .\api\;npm run start


If (TypeError: Cannot assign to read only property 'jsx' of object '#<Object>'  
    at verifyTypeScriptSetup (C:\Users\casan\Documents\Web Projects\fargus_project\client\node_modules\react-scripts\scripts\utils\verifyTypeScriptSetup.js:239:43)
    at Object.<anonymous> (C:\Users\casan\Documents\Web Projects\fargus_project\client\node_modules\react-scripts\scripts\start.js:31:1)))
Then delete the tsconfig.json inside client folder. This is error happens in the newest version of TS and React. I haven't put the effort to actually downgrading TS but that appears the be the optimal
solution.