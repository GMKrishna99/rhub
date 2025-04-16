package com.rithikahub
 
import android.app.Activity
import android.content.ComponentName
import android.content.Intent
import android.content.pm.PackageManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
 
class DynamicIconModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
 
    override fun getName(): String {
        return "DynamicIcon"
    }
 
    @ReactMethod
    fun changeIcon(iconName: String, promise: Promise) {
        try {
            val currentActivity = currentActivity ?: throw Exception("Activity not available")
            val packageName = currentActivity.packageName
            val pm = currentActivity.packageManager
 
            // Disable all components first
            listOf(
                "$packageName.MainActivity",
                "$packageName.DefaultIconAlias",
                "$packageName.Logo2Alias",
                "$packageName.Logo3Alias",
                "$packageName.Logo4Alias",
                "$packageName.Logo5Alias",
                "$packageName.Logo6Alias"
            ).forEach { alias ->
                pm.setComponentEnabledSetting(
                    ComponentName(packageName, alias),
                    PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                    PackageManager.DONT_KILL_APP
                )
            }
 
            // Enable selected component
            val targetComponent = when (iconName) {
                "default" -> "$packageName.DefaultIconAlias"
                "logo2" -> "$packageName.Logo2Alias"
                "logo3" -> "$packageName.Logo3Alias"
                "logo4" -> "$packageName.Logo4Alias"
                "logo5" -> "$packageName.Logo5Alias"
                "logo6" -> "$packageName.Logo6Alias"
                else -> throw IllegalArgumentException("Invalid icon name")
            }
 
            pm.setComponentEnabledSetting(
                ComponentName(packageName, targetComponent),
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                PackageManager.DONT_KILL_APP
            )
 
            // Refresh launcher
            refreshLauncher(currentActivity)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ICON_CHANGE_FAILED", e.message, e)
        }
    }
 
    @ReactMethod
    fun getCurrentIcon(promise: Promise) {
        try {
            val currentActivity = currentActivity ?: throw Exception("Activity not available")
            val packageName = currentActivity.packageName
            val pm = currentActivity.packageManager
 
            val aliases = listOf(
                "$packageName.DefaultIconAlias" to "default",
                "$packageName.Logo2Alias" to "logo2",
                "$packageName.Logo3Alias" to "logo3",
                "$packageName.Logo4Alias" to "logo4",
                "$packageName.Logo5Alias" to "logo5",
                "$packageName.Logo6Alias" to "logo6"
            )
 
            for ((alias, iconName) in aliases) {
                if (pm.getComponentEnabledSetting(ComponentName(packageName, alias)) == 
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED) {
                    promise.resolve(iconName)
                    return
                }
            }
            promise.resolve("default")
        } catch (e: Exception) {
            promise.reject("GET_ICON_FAILED", e.message, e)
        }
    }
 
    private fun refreshLauncher(activity: Activity) {
        try {
            val intent = Intent(Intent.ACTION_MAIN).apply {
                addCategory(Intent.CATEGORY_HOME)
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            activity.startActivity(intent)
        } catch (e: Exception) {
            // Ignore if launcher refresh fails
        }
    }
}