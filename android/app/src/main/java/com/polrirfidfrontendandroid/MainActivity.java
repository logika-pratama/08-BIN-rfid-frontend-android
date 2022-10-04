package com.polrirfidfrontendandroid;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

// splashscreen 
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RFIDScannerWL";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // splashscreen
    SplashScreen.show(this);
    
    super.onCreate(null);
  }
}
