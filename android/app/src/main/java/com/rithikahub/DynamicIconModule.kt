package com.rithikahub
 
import android.app.Activity
import android.content.ComponentName
import android.content.Intent
import android.content.pm.PackageManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import java.net.URL
import android.os.AsyncTask
import android.util.Log
import java.io.File
import java.io.FileOutputStream
import android.content.Context
 
class DynamicIconModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
 
    override fun getName(): String {
        return "DynamicIcon"
    }
 
    @ReactMethod
    fun changeIcon(iconUrl: String, promise: Promise) {
        try {
            val currentActivity = currentActivity ?: throw Exception("Activity not available")
            DownloadIconTask(currentActivity, promise).execute(iconUrl)
        } catch (e: Exception) {
            promise.reject("ICON_CHANGE_FAILED", e.message, e)
        }
    }
 
    @ReactMethod
    fun getCurrentIcon(promise: Promise) {
        try {
            val currentActivity = currentActivity ?: throw Exception("Activity not available")
            val iconFile = File(currentActivity.filesDir, "current_icon.png")
            if (iconFile.exists()) {
                promise.resolve(iconFile.absolutePath)
            } else {
                promise.resolve(null)
            }
        } catch (e: Exception) {
            promise.reject("GET_ICON_FAILED", e.message, e)
        }
    }
 
    private inner class DownloadIconTask(
        private val context: Context,
        private val promise: Promise
    ) : AsyncTask<String, Void, Boolean>() {
 
        override fun doInBackground(vararg params: String): Boolean {
            try {
                val iconUrl = params[0]
                val url = URL(iconUrl)
                val bitmap = BitmapFactory.decodeStream(url.openStream())
                
                val iconFile = File(context.filesDir, "current_icon.png")
                FileOutputStream(iconFile).use { out ->
                    bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)
                }
                
                // Update the app icon
                val packageManager = context.packageManager
                val componentName = ComponentName(context, context.javaClass)
                packageManager.setComponentEnabledSetting(
                    componentName,
                    PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                    PackageManager.DONT_KILL_APP
                )
                
                // Create a new activity-alias with the downloaded icon
                val intent = Intent(Intent.ACTION_MAIN).apply {
                    addCategory(Intent.CATEGORY_HOME)
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
                context.startActivity(intent)
                
                return true
            } catch (e: Exception) {
                Log.e("DynamicIcon", "Error downloading icon", e)
                return false
            }
        }
 
        override fun onPostExecute(result: Boolean) {
            if (result) {
                promise.resolve(true)
            } else {
                promise.reject("ICON_CHANGE_FAILED", "Failed to download or set icon")
            }
        }
    }
}