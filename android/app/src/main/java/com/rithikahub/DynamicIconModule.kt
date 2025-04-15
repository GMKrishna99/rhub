package com.rithikahub
 
import android.app.Activity
import android.content.ComponentName
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
    fun changeIcon(iconName: String) {
        val currentActivity = currentActivity ?: return
        val packageName = currentActivity.packageName
        val pm = currentActivity.packageManager
 
        // Disable all aliases first
        listOf(
            "$packageName.MainActivityic_launcher",
            "$packageName.MainActivityic_launcher_logo_2",
            "$packageName.MainActivityic_launcher_logo_3",
            "$packageName.MainActivityic_launcher_logo_4",
            "$packageName.MainActivityic_launcher_logo_5",
            "$packageName.MainActivityic_launcher_logo_6"
        ).forEach { alias ->
            pm.setComponentEnabledSetting(
                ComponentName(packageName, alias),
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP
            )
        }
 
        // Enable the selected alias or default
        when (iconName) {
            "default" -> {
                pm.setComponentEnabledSetting(
                    ComponentName(packageName, "$packageName.MainActivityic_launcher"),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                    PackageManager.DONT_KILL_APP
                )
            }
            "logo2" -> {
                pm.setComponentEnabledSetting(
                    ComponentName(packageName, "$packageName.MainActivityic_launcher_logo_2"),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                    PackageManager.DONT_KILL_APP
                )
            }
            "logo3" -> {
                pm.setComponentEnabledSetting(
                    ComponentName(packageName, "$packageName.MainActivityic_launcher_logo_3"),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                    PackageManager.DONT_KILL_APP
                )
            }
            "logo4" -> {
                pm.setComponentEnabledSetting(
                    ComponentName(packageName, "$packageName.MainActivityic_launcher_logo_4"),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                    PackageManager.DONT_KILL_APP
                )
            }
            "logo5" -> {
                pm.setComponentEnabledSetting(
                    ComponentName(packageName, "$packageName.MainActivityic_launcher_logo_5"),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                    PackageManager.DONT_KILL_APP
                )
            }
            "logo6" -> {
                pm.setComponentEnabledSetting(
                    ComponentName(packageName, "$packageName.MainActivityic_launcher_logo_6"),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                    PackageManager.DONT_KILL_APP
                )
            }
        }
    }
 
    @ReactMethod
    fun getCurrentIcon(promise: Promise) {
        val currentActivity = currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "No current activity")
            return
        }
 
        val packageName = currentActivity.packageName
        val pm = currentActivity.packageManager
 
        val aliases = listOf(
            "$packageName.MainActivityic_launcher",
            "$packageName.MainActivityic_launcher_logo_2",
            "$packageName.MainActivityic_launcher_logo_3",
            "$packageName.MainActivityic_launcher_logo_4",
            "$packageName.MainActivityic_launcher_logo_5",
            "$packageName.MainActivityic_launcher_logo_6"
        )
 
        aliases.forEachIndexed { index, alias ->
            if (pm.getComponentEnabledSetting(ComponentName(packageName, alias)) == 
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED) {
                promise.resolve(
                    when (index) {
                        0 -> "default"
                        1 -> "logo2"
                        2 -> "logo3"
                        3 -> "logo4"
                        4 -> "logo5"
                        5 -> "logo6"
                        else -> "default"
                    }
                )
                return
            }
        }
        promise.resolve("default")
    }
}