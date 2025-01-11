import admin from "firebase-admin";
import * as serviceAccount from "@/config/firebase-serviceAccountKey.json" // 서비스 계정 키 파일 경로

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const messaging = admin.messaging();
