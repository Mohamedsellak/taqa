import React from 'react';
import { View, Text, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebViewScreen() {
    const webViewRef = React.useRef(null);
    const [canGoBack, setCanGoBack] = React.useState(false);
    const Urls = ['https://taqa.great-site.net/','https://taqa.great-site.net/?i=1', 'https://taqa.great-site.net/questionnaire'];

    const handleBackPress = () => {
        if (canGoBack) {
            webViewRef.current.goBack();
            return true; // Prevent default back behavior
        } else {
            return false
        }
};

    React.useEffect(() => {
        const backHandlerSubscription = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
    );

    return () => backHandlerSubscription.remove(); // Remove listener on unmount
    }, [canGoBack]);

    const onNavigationStateChange = (navState) => {
        // console.log(navState.url);
        setCanGoBack(!Urls.includes(navState.url));
    };

    return (
        <WebView
            ref={webViewRef}
            source={{ uri: 'https://taqa.great-site.net/' }}
            // allowsInsecureHRR={true}
            // allowsInsecureHTTP={true}
            // ignoreSslError={true}
            style={{ marginTop: 40 }}
            startInLoadingState
            onNavigationStateChange={onNavigationStateChange}
            renderLoading={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff' }}>
                <Text style={{ fontWeight:'bold' }}>Loading...</Text>
            </View>
            )}
        />
    );
}
