# flutterAppPushNotification
Kóði fyrir push notifications í gegnum cloud functions


Þessi kóði ber saman titilinn á nýjustu grein sem til er á APIinu sem búið var til á slóðinni
"http://www.keflavik.is/resources/json/skotdeild.aspx".

Ef hann er ekki sá sami og er til í gegnagrunninum frá því þegar síðast var gáð sendist push notification
á alla síma sem eru með appið installað.


Þetta function er keyrt sjálfkrafa á klukkutíma fresti (xx:30) í gegnum cloud scheduler og einnig má keyra hann 
manually með því að fara á slóðina "https://us-central1-skotkef-f9820.cloudfunctions.net/helloWorld".

Ef það er þörf á því að senda push notification sem fyrst eftir að ný frétt hefur verið sett upp á síðuna er því hægt
að fylgja þessum link til að senda alert um leið og hún er kominn á heimasíðuna.
