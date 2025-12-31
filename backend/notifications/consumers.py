from channels.generic.websocket import AsyncWebsocketConsumer
import json

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        print("WS CONNECT ATTEMPT:", user)


        if user.is_anonymous:
            print("WS REJECTED (anonymous)")
            await self.close()
            return

        self.group_name = f"user_{user.id}"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()
        print("WS CONNECTED:", self.group_name)


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def send_notification(self, event):
        print("WS MESSAGE SENT:", event)
        await self.send(text_data=json.dumps(event["data"]))
