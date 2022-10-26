import React, {Component} from 'react';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  NativeModules,
  Platform,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  RefreshControl,
} from 'react-native';

import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

import Svg, {G, Path} from 'react-native-svg';

import Storage from '../utils/storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {ApplePayButton, PaymentRequest} from 'react-native-payments';

/*let purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {

        let p = purchase

        global.socket.on('verifypurchase', function(ret){

          global.socket.off('verifypurchase');



          global.coin = parseInt(ret);

          finishTransaction(p).then(() => {});

        });


        let params = {'uuid' : global.deviceid, 'requestor' : global.user_id, 'receipt':purchase.transactionReceipt};

        global.socket.emit('verifypurchase', params);

        /*console.info('purchase', purchase);
        const receipt = purchase.transactionReceipt
          ? purchase.transactionReceipt
          : purchase.originalJson;
        console.info(receipt);
        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);
            console.info('ackResult', ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }

          this.goNext()
        }


      },
    );*/

let thisClass = null;

class CoinScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ui: [],
      title: '',
      showLoading: true,
      rankings: [],
      refresh: false,
      coins: [],
      currentCoin: 0,
      buying: false,
      // currencyText: global.locale == 'en' ? ' Yen' : '円',
      currencyText: '円',
      items: Platform.select({
        android: [
          'trialpack',
          'callplan_01',
          'deluxpack',
          'standardpack01',
          'lightpack',
          'chatplan_01',
        ],
        ios: [
          'android.test.purchased',
          'android.test.canceled',
          'android.test.refunded',
          'android.test.item_unavailable',
          'point_1000',
          '5000_point', // dooboolab
        ],
      }),
    };

    this.renderCell = this.renderCell.bind(this);

    this.buy = this.buy.bind(this);

    // this.getUI = this.getUI.bind(this);

    this.back = this.back.bind(this);

    thisClass = this;

    this.purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        global.socket.on('emit-buy-points-bundle', function (ret) {
          let self = this;

          global.socket.off('emit-buy-points-bundle');
          // alert(ret);

          global.bundle = ret;
        });
        let params = {};

        params['amount'] = global.price;

        global.socket.emit('on-buy-points-bundle', params);

        console.info('purchase', purchase);
        const receipt = purchase.transactionReceipt
          ? purchase.transactionReceipt
          : purchase.originalJson;
        console.info(receipt);
        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);
            console.info('ackResult', ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }
        }
      },
    );
  }

  componentDidMount() {
    this.init();
  }

  init() {
    // this.getCoins();
    let self = this;

    RNIap.initConnection().then(() => {
      RNIap.getProducts(self.state.items).then(res => {
        //  alert(JSON.stringify(res));
        self.setState({
          res: res,
          price: res[0].price,
        });
        global.price = self.state.price;

        // alert(JSON.stringify(global.price));
        this.getCoins();
      });
    });

    // self.getUserCoin();
  }

  componentWillUnmount() {
    this.getCoins();
  }

  // getUI() {
  //   let self = this;

  //   global.socket.on('ui', function (ret) {
  //     global.socket.off('ui');

  //     self.setState(
  //       {
  //         ui: ret,
  //         title: ret[0].ui,
  //         showLoading: false,
  //       },
  //       () => {
  //         self.getCoins();
  //       },
  //     );
  //   });

  //   let params = {locale: global.locale, type: '13'};

  //   global.socket.emit('ui', params);
  // }

  back() {
    this.props.navigation.navigate('home');
  }

  // getUserCoin() {
  //   let self = this;

  //   global.socket.on('emit-points-bundle-detail', function (ret) {
  //     global.socket.off('emit-points-bundle-detail');
  //     alert(ret);

  //     self.setState({
  //       // currentCoin: ret[0].coin,
  //       refreshing: false,
  //     });

  //     // global.coin = ret[0].coin;
  //   });

  //   console.log('went into usercoin');

  //   console.log(this.state);

  //   let params = {uuid: global.deviceid, userid: global.user_id};

  //   global.socket.emit('emit-points-bundle-detail', params);
  // }

  getCoins() {
    let self = this;
    this.setState(
      {},

      () => {
        global.socket.on('emit-points-bundle', function (ret) {
          global.socket.off('emit-points-bundle');
          // alert(JSON.stringify(ret));
          // console.log('here');
          // alert(2);
          self.setState({
            bundle: ret,
            amount: ret[0].amount,
            // showLoading: false,
            bundleid: ret[0].bundleid,
            description: ret[0].description,
            price: ret[0].price,
          });

          global.amount = self.state.amount;
        });

        let params = {
          bundleid: global.bundleid,
          bundle: this.state.bundle,
          amount: this.state.amount,
          price: this.state.price,
          description: this.state.description,
        };

        global.socket.emit('on-points-bundle', params);
      },
    );
  }

  buy(productId, description, price) {
    let self = this;
    console.log(productId);

    try {
      RNIap.getProducts(this.state.items)
        .then(success => {
          let product = success[0];

          RNIap.requestPurchase(productId)
            .then(ok => {
              self.setState({
                buying: true,
              });
            })
            .catch(error => {
              alert(error);
            });
        })

        .catch(error => {
          alert(error);
        });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  renderCell(item) {
    console.log(item.index);
    return <CoinCell item={item} self={this} />;
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        currentCoin: global.coin,
      },
      () => {
        this.getUserCoin();
      },
    );
  };

  render() {
    let tableHeight = 0;

    if (windowHeight >= 926) {
      tableHeight = windowHeight - 150;
    } else if (windowHeight >= 667) {
      tableHeight = windowHeight - 70;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          height: windowHeight,

          borderColor: '#FAEA48',
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#FAEA48',
            height: windowHeight / 13,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              position: 'absolute',
              width: '100%',
              height: 30,
              lineHeight: 32,
              textAlign: 'center',
              fontSize: 13,
              marginTop: windowHeight / 10 - 35,
              fontWeight: 'bold',
              color: '#FFF',
            }}>
            {this.state.title}
          </Text>

          <TouchableOpacity
            style={{
              marginLeft: 10,
              marginTop: windowHeight / 10 - 65,
              width: 50,
              height: 30,
            }}
            onPress={() => this.back()}>
            <Svg
              style={{width: 20, height: 30}}
              aria-hidden="true"
              focusable="false"
              data-prefix="fal"
              data-icon="angle-left"
              class="svg-inline--fa fa-angle-left fa-w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192 512">
              <Path
                fill="black"
                d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></Path>
            </Svg>
          </TouchableOpacity>
          <Image
            source={require('../icon/coin13.png')}
            style={{
              marginLeft: windowWidth / 2 - 100,
              width: 70,
              height: 70,
              resizeMode: 'contain',
            }}
          />
        </View>

        <View
          style={{
            width: windowWidth,
            height: tableHeight,
            backgroundColor: '#fff',
          }}>
          <View style={{width: windowWidth, height: 100, alignSelf: 'center'}}>
            <Image
              source={require('../icon/coin1.png')}
              style={{
                alignSelf: 'center',
                top: windowWidth / 2 - 270,
                width: 250,
                height: 250,
                resizeMode: 'contain',
              }}
            />
          </View>

          <FlatList
            onEndReachedThreshold={0.3}
            initialNumToRender={10}
            removeClippedSubviews={true}
            extraData={this.state.refresh}
            style={{
              width: '100%',
              marginLeft: 5,
              paddingTop: windowHeight - 800,
              backgroundColor: '#fff',
              borderRadius: 3,
              alignSelf: 'center',
            }}
            viewabilityConfig={this.viewabilityConfig}
            data={this.state.res}
            renderItem={this.renderCell}
            keyExtractor={item => item.productId}
            refreshing={this.state.refreshing}
            // onRefresh={this.handleRefresh}
          />
        </View>
      </View>
    );
  }
}

const CoinCell = ({item, self}) => (
  <TouchableOpacity
    style={{
      width: windowWidth - 33,
      marginTop: 10,
      marginBottom: 10,
      padding: 5,
      marginLeft: 0,
      borderRadius: 3,
      backgroundColor: '#fff',
      flexDirection: 'row',
      // borderWidth: 1,
    }}
    onPress={() =>
      self.buy(item.item.productId, item.item.description, item.item.price)
    }>
    {/* <Image
      resizeMode="cover"
      style={{
        width: item.index == 7 || item.index == 6 ? 50 : 30,
        height: 30,
        marginTop: 6,
        marginLeft: 5,
      }}
      source={{uri: 'https://goodlookin.live:8002/coin/' + item.item.image}}
    /> */}

    <Text
      multiline={true}
      style={{
        height: 40,
        width: windowWidth - 120,
        lineHeight: item.index == 7 ? 20 : 40,
        fontSize: 17,
        paddingLeft: 10,
        color: 'black',
        fontStyle: 'italic',
      }}>
      {item.item.description}
    </Text>

    <Text
      style={{
        position: 'absolute',
        width: 60,
        left: windowWidth - 100,
        // height: 50,
        // lineHeight: 50,
        textAlign: 'center',
        fontSize: 16,
        // paddingLeft: 10,
        fontWeight: 'bold',
        color: 'black',
        borderWidth: 1,
      }}>
      {Math.round(item.item.price)}
      {self.state.currencyText}
    </Text>
  </TouchableOpacity>
);

export default CoinScreen;
