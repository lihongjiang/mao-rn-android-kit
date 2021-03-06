import { Component, createElement, Children, PropTypes } from "react";
import { 
    requireNativeComponent, 
    View, 
    ViewProperties,
    UIManager,
    findNodeHandle,
    ViewPagerAndroidStatic 
} from 'react-native';

export interface Tab {
    text: string;
}

export interface TabLayoutAndroidProps extends ViewProperties {
    tabs?: Tab[];
    tabTextSize?: number;
    tabTextColor?: string;
    tabSelectedTextColor?: string;
    tabIndicatorColor?: string;
    tabIndicatorHeight?: number;
    tabMode?: "scrollable" | "fixed";
    tabGravity?: "center" | "fill";
    activeTabStyle?: Dictionary<any>;
}

const Commands = UIManager.MaoKitsTabLayoutAndroid.Commands;
const SETUP_VIEW_PAGER = Commands.setupViewPager;

export default class TabLayoutAndroid extends Component<TabLayoutAndroidProps, any> {

    static propTypes = Object.assign({}, View.propTypes, {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired
        })),
        tabTextColor: PropTypes.string,
        tabTextSize: PropTypes.number,
        tabSelectedTextColor: PropTypes.string,
        tabIndicatorColor: PropTypes.string,
        tabIndicatorHeight: PropTypes.number,
        tabMode: PropTypes.oneOf(["scrollable", "fixed"]),
        tabGravity: PropTypes.oneOf(["center", "fill"]),
        activeTabStyle: PropTypes.object
    });


    render() {
        return (
            <RCTTabLayoutAndroid 
                 {...this.props}
                 style={[
                     { height: 48 },
                     this.props.style
                 ]}>
                 {this._childrenWithOverridenStyle()}
            </RCTTabLayoutAndroid>
        );
    }

    setViewPager(viewPager: ViewPagerAndroidStatic, tabs?: Tab[]) {
        if (!viewPager) {
            return;
        }

        const viewPagerID = findNodeHandle(viewPager as any);
        
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            SETUP_VIEW_PAGER,
            [viewPagerID, tabs]
        );  
    }

    private _childrenWithOverridenStyle() {
        if (!this.props.children) {
            return;
        }

        return Children.map(this.props.children, (child: any, index: any) => {
            let newProps = Object.assign({
                key: index,
                style: [
                    {
                        justifyContent: 'center',
                        alignItems: 'center'
                    }, 
                    child.props.style, 
                    this.props.activeTabStyle
                ]
            }, child.props);

            if (child.type &&
                child.type.displayName &&
                (child.type.displayName !== 'RCTView') &&
                (child.type.displayName !== 'View')) {
                console.warn('Each TabLayout child must be a <View>. Was ' + child.type.displayName);
            }

            return createElement(child.type, newProps);
        });
    }
}

const RCTTabLayoutAndroid: any = requireNativeComponent(
    "MaoKitsTabLayoutAndroid", 
    TabLayoutAndroid,
    {
        nativeOnly: {}
    }
);

