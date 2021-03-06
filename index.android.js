import * as React from 'react';
import * as ReactNative from 'react-native';
import { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ViewPagerAndroid,
    ToolbarAndroid
} from 'react-native';

global.React = React;

import {
    CoordinatorLayoutAndroid,
    AppBarLayoutAndroid,
    TabLayoutAndroid,
    NestedScrollViewAndroid,
} from './dist/index';// 注:这里的引入方式只是组件开发环境中的使用方式

/* 注:实际引用方式
import {
    CoordinatorLayoutAndroid,
    AppBarLayoutAndroid,
    TabLayoutAndroid,
    NestedScrollViewAndroid,
} from 'mao-rn-android-kit';
 */

class App extends Component<any, any> {
    componentDidMount() {
        this.coordinatorLayout.setScrollingViewBehavior(this.viewPager);
        this.tabLayout.setViewPager(this.viewPager, [
            { text : "tab1" },
            { text: "tab2" },
            { text: "tab3" },
            { text: "tab4" },
            { text: "tab5" },
            { text: "tab6" },
            { text: "tab7" },
            { text: "tab8" },
            { text: "tab9" },
            { text: "tab10" },
        ]);
    }
    
    render() {

        return (
            <View style={styles.container}>
                <CoordinatorLayoutAndroid
                    ref={(component) => this.coordinatorLayout = component}
                    fitsSystemWindows={false} >
                    <AppBarLayoutAndroid
                        style={{ backgroundColor:"#fff000" }}  >
                        <ToolbarAndroid
                            layoutParams={{
                                scrollFlags: (
                                    AppBarLayoutAndroid.SCROLL_FLAG_SCROLL | 
                                    AppBarLayoutAndroid.SCROLL_FLAG_ENTRY_ALWAYS |
                                    AppBarLayoutAndroid.SCROLL_FLAG_SNAP
                               )
                            }}
                            style={{ height: 50 }}>
                            <View><Text>Hello,world</Text></View>
                        </ToolbarAndroid>
                        <TabLayoutAndroid 
                            ref={(component) => this.tabLayout = component}
                            tabMode="scrollable"
                            tabSelectedTextColor="red"
                            tabIndicatorColor="red"
                            tabIndicatorHeight={10}
                            tabTextSize={16}
                             />
                    </AppBarLayoutAndroid>
                    <ViewPagerAndroid
                        ref={(compoent) => this.viewPager = compoent}
                        style={{ flex: 1, backgroundColor: "transparent", height:  Dimensions.get('window').height - 70 }}
                        >
                        {this.getPages()}
                    </ViewPagerAndroid>
                    
                </CoordinatorLayoutAndroid>

            </View>
        );
    }

    getPages() {
        const pages = [];
        for (let i = 0; i < 10; i++) {
            pages.push(<View key={i}>
                <NestedScrollViewAndroid 
                    style={{
                        height: Dimensions.get('window').height - 70
                    }}>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                    <Text style={{ margin: 8 }}>{this.getText()}</Text>
                </NestedScrollViewAndroid>
            </View>);
        }
        return pages;
    }

    getText() {
        return 'React Native使你能够在Javascript和React的基础上获得完全一致的开发体验，构建世界一流的原生APP。 React Native着力于提高多平台开发的开发效率 —— 仅需学习一次，编写任何平台。(Learn once, write anywhere) Facebook已经在多项产品中使用了React Native，并且将持续地投入建设React Native。';
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        height: 400
    },
    instructions: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 5
    }
});

AppRegistry.registerComponent('MaoRNAndroidKit', () => App);

