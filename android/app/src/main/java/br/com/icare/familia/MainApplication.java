package br.com.icare.familia;

import android.app.Application;
//import android.util.Log;

import android.content.Context;
import com.facebook.react.PackageList;
//import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
//import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
// import com.facebook.CallbackManager;
// import com.facebook.FacebookSdk;
// import com.facebook.appevents.AppEventsLogger;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
//import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.google.android.gms.ads.MobileAds;


//import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

// // FBSdk
//   private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
// // FBSdk
//   protected static CallbackManager getCallbackManager() {
//     return mCallbackManager;
//   }

  private final ReactNativeHost mReactNativeHost = 
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

  @Override
  protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
       packages.add(new RNFirebaseFirestorePackage());
       packages.add(new RNFirebaseAuthPackage());
       //packages.add(new RNFirebasePackage());
       packages.add(new RNFirebaseAdMobPackage());
       packages.add(new RNFirebaseAnalyticsPackage());
      //  packages.add(new FBSDKPackage());
      return packages;
    }
/* return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
          new FBSDKPackage(mCallbackManager),
          new RNGoogleSigninPackage(),
          new RNFirebasePackage(),
          new VectorIconsPackage(),
          new RNGestureHandlerPackage(),
          //Add by Jonathan - Firebase - rnfirebase.io
          new RNFirebaseAuthPackage(),
          new RNFirebaseFirestorePackage()
    );
  }*/

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    //FacebookSDK
    // AppEventsLogger.activateApp(this);
    // FacebookSdk.sdkInitialize(getApplicationContext());
    // AppEventsLogger.activateApp(this);
    
    //https://dev-yakuza.github.io/en/react-native/react-native-firebase-admob/
    //set your App ID created in Google Admob to MobileAds.initialize(this, "ad app id");. if you don’t know how to create App ID in Google Admob, see Google Admob blog.
    MobileAds.initialize(this, "????");
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
