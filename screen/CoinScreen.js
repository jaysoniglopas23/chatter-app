// import React, {Component} from 'react';

// import {
//   ActivityIndicator,
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   Animated,
//   NativeModules,
//   Platform,
//   Dimensions,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
//   Modal,
//   RefreshControl,
// } from 'react-native';

// import RNIap, {
//   InAppPurchase,
//   PurchaseError,
//   SubscriptionPurchase,
//   acknowledgePurchaseAndroid,
//   consumePurchaseAndroid,
//   finishTransaction,
//   finishTransactionIOS,
//   purchaseErrorListener,
//   purchaseUpdatedListener,
// } from 'react-native-iap';

// import Svg, {
//   G,
//   Path,
//   Stop,
//   Defs,
//   LinearGradient,
//   Circle,
//   Rect,
// } from 'react-native-svg';
// import moment from 'moment';

// import Storage from '../utils/storage';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// import {ApplePayButton, PaymentRequest} from 'react-native-payments';

// /*let purchaseUpdateSubscription = purchaseUpdatedListener(
//       async (purchase: InAppPurchase | SubscriptionPurchase) => {

//         let p = purchase

//         global.socket.on('verifypurchase', function(ret){

//           global.socket.off('verifypurchase');

//           global.coin = parseInt(ret);

//           finishTransaction(p).then(() => {});

//         });

//         let params = {'uuid' : global.deviceid, 'requestor' : global.user_id, 'receipt':purchase.transactionReceipt};

//         global.socket.emit('verifypurchase', params);

//         /*console.info('purchase', purchase);
//         const receipt = purchase.transactionReceipt
//           ? purchase.transactionReceipt
//           : purchase.originalJson;
//         console.info(receipt);
//         if (receipt) {
//           try {
//             const ackResult = await finishTransaction(purchase);
//             console.info('ackResult', ackResult);
//           } catch (ackErr) {
//             console.warn('ackErr', ackErr);
//           }

//           this.goNext()
//         }

//       },
//     );*/

// let thisClass = null;

// class CoinScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       ui: [],
//       title: '',
//       showLoading: true,
//       rankings: [],
//       refresh: false,
//       coins: [],
//       currentCoin: 0,
//       buying: false,
//       // currencyText: global.locale == 'en' ? ' Yen' : '円',
//       currencyText: '円',
//       items: Platform.select({
//         android: [
//           'trialpack',
//           'callplan_01',
//           'deluxpack',
//           'standardpack01',
//           'lightpack',
//           'chatplan_01',
//         ],
//         ios: [
//           'android.test.purchased',
//           'android.test.canceled',
//           'android.test.refunded',
//           'android.test.item_unavailable',
//           'point_1000',
//           '5000_point', // dooboolab
//         ],
//       }),
//     };

//     this.renderCell = this.renderCell.bind(this);

//     this.buy = this.buy.bind(this);

//     // this.getUI = this.getUI.bind(this);

//     this.back = this.back.bind(this);

//     thisClass = this;

//     this.purchaseUpdateSubscription = purchaseUpdatedListener(
//       async (purchase: InAppPurchase | SubscriptionPurchase) => {
//         global.socket.on('emit-buy-points', function (ret) {
//           let self = this;

//           global.socket.off('emit-buy-points');
//           // alert(ret);

//           global.bundle = ret;
//         });
//         let params = {};

//         params['count'] = 20;
//         params['datetime'] = moment(new Date()).format('YYYY-MM-DD  HH:mm:ss ');
//         params['amount'] = global.price;

//         global.socket.emit('on-buy-points', params);

//         console.info('purchase', purchase);
//         const receipt = purchase.transactionReceipt
//           ? purchase.transactionReceipt
//           : purchase.originalJson;
//         console.info(receipt);
//         if (receipt) {
//           try {
//             const ackResult = await finishTransaction(purchase);
//             console.info('ackResult', ackResult);
//           } catch (ackErr) {
//             console.warn('ackErr', ackErr);
//           }
//         }
//       },
//     );
//   }

//   componentDidMount() {
//     this.init();
//   }

//   init() {
//     // this.getCoins();
//     let self = this;

//     RNIap.initConnection().then(() => {
//       RNIap.getProducts(self.state.items).then(res => {
//         //  alert(JSON.stringify(res));
//         self.setState({
//           res: res,
//           price: res[0].price,
//         });
//         global.price = self.state.price;

//         // alert(JSON.stringify(global.price));
//         this.getCoins();
//       });
//     });

//     // self.getUserCoin();
//   }

//   componentWillUnmount() {
//     this.getCoins();
//     this.init();
//   }

//   // getUI() {
//   //   let self = this;

//   //   global.socket.on('ui', function (ret) {
//   //     global.socket.off('ui');

//   //     self.setState(
//   //       {
//   //         ui: ret,
//   //         title: ret[0].ui,
//   //         showLoading: false,
//   //       },
//   //       () => {
//   //         self.getCoins();
//   //       },
//   //     );
//   //   });

//   //   let params = {locale: global.locale, type: '13'};

//   //   global.socket.emit('ui', params);
//   // }

//   back() {
//     this.props.navigation.navigate('home');
//   }

//   // getUserCoin() {
//   //   let self = this;

//   //   global.socket.on('emit-points-bundle-detail', function (ret) {
//   //     global.socket.off('emit-points-bundle-detail');
//   //     alert(ret);

//   //     self.setState({
//   //       // currentCoin: ret[0].coin,
//   //       refreshing: false,
//   //     });

//   //     // global.coin = ret[0].coin;
//   //   });

//   //   console.log('went into usercoin');

//   //   console.log(this.state);

//   //   let params = {uuid: global.deviceid, userid: global.user_id};

//   //   global.socket.emit('emit-points-bundle-detail', params);
//   // }

//   getCoins() {
//     let self = this;
//     this.setState(
//       {},

//       () => {
//         global.socket.on('emit-points-bundle', function (ret) {
//           global.socket.off('emit-points-bundle');
//           // alert(JSON.stringify(ret));
//           // console.log('here');
//           // alert(2);
//           self.setState({
//             bundle: ret,
//             amount: ret[0].amount,
//             // showLoading: false,
//             bundleid: ret[0].bundleid,
//             description: ret[0].description,
//             price: ret[0].price,
//             name:ret[0].name,
//           });

//           global.amount = self.state.amount;
//         });

//         let params = {
//           // bundleid: 383,
//           // bundle: this.state.bundle,
//           // amount: this.state.amount,
//           // price: this.state.price,
//           // description: this.state.description,
//         };

//         params['bundleid'] = 1;
//         params['amount'] = 90;
//         params['price'] = 12.00;
//         params['name'] = this.state.buying.name;
//         params['description'] = this.state.description;

//         global.socket.emit('on-points-bundle', params);
//       },
//     );
//   }

//   buy(bundleid ,description, price) {
//     let self = this;
//     console.log(bundleid);

//     try {
//       RNIap.getProducts(this.state.bundle)
//       // alert(1)
//         .then(success => {
//           let bundleid = success[0];
//           // alert(2)
//           RNIap.requestPurchase(bundleid)
//             //  .alert(3)

//             .then(ok => {

//               self.setState({
//                 buying: true,
//               });
//             })
//             .catch(error => {
//               // alert(4)
//               alert(error);
//             });

//             alert(JSON.stringify(this.state.bundle))
//         })

//         .catch(error => {
//           alert(error);
//         });
//     } catch (err) {
//       console.warn(err.code, err.message);
//     }
//   }

//   renderCell(item) {
//     console.log(item.index);
//     return <CoinCell item={item} self={this} />;
//   }

//   handleRefresh = () => {
//     this.setState(
//       {
//         refreshing: true,
//         currentCoin: global.coin,
//       },
//       () => {
//         this.getUserCoin();
//       },
//     );
//   };

//   render() {
//     let tableHeight = 0;

//     if (windowHeight >= 926) {
//       tableHeight = windowHeight - 150;
//     } else if (windowHeight >= 667) {
//       tableHeight = windowHeight - 70;
//     }

//     return (
//       <View
//         style={{
//           flex: 1,
//           flexDirection: 'column',
//           height: windowHeight,

//           borderColor: '#FAEA48',
//         }}>
//         <View
//           style={{
//             width: '100%',
//             backgroundColor: '#FFF',
//             height: windowHeight / 13,
//             flexDirection: 'row',
//           }}>
//           {/* <Text
//             style={{
//               position: 'absolute',
//               width: '100%',
//               height: 30,
//               lineHeight: 32,
//               textAlign: 'center',
//               fontSize: 13,
//               marginTop: windowHeight / 10 - 35,
//               fontWeight: 'bold',
//               color: '#FFF',
//             }}>
//             {this.state.title}
//           </Text> */}

//           <TouchableOpacity
//             style={{
//               marginLeft: 15,
//               marginTop: windowHeight / 10 - 60,
//               width: 40,
//               height: 40,
//               backgroundColor: '#FFF5F8',
//               borderRadius: 10,
//             }}
//             onPress={() => this.back()}>
//             <Svg
//               style={{alignSelf: 'center', top: 10, right: 2}}
//               aria-hidden="true"
//               focusable="false"
//               data-prefix="fal"
//               data-icon="angle-left"
//               class="svg-inline--fa fa-angle-left fa-w-6"
//               role="img"
//               width="16"
//               height="21"
//               viewBox="0 0 6 11"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg">
//               <Path
//                 fill-rule="evenodd"
//                 clip-rule="evenodd"
//                 d="M5.65863 10.0143C5.39578 10.2771 4.96961 10.2771 4.70676 10.0143L0.668298 5.97582C0.405446 5.71297 0.405446 5.2868 0.668298 5.02395L4.70676 0.985489C4.96961 0.722635 5.39578 0.722635 5.65863 0.985489C5.92149 1.24834 5.92149 1.67451 5.65863 1.93736C3.69111 3.90489 3.69111 7.09488 5.65863 9.06241C5.92149 9.32526 5.92149 9.75143 5.65863 10.0143Z"
//                 fill="#EA337E"
//               />
//               <Defs>
//                 <LinearGradient
//                   id="paint0_linear_50_2341"
//                   x1="3.16347"
//                   y1="10.2114"
//                   x2="3.16347"
//                   y2="0.788349"
//                   gradientUnits="userSpaceOnUse">
//                   <Stop stop-color="#ED70B0" />
//                   <Stop offset="1" stop-color="#EA337E" />
//                 </LinearGradient>
//               </Defs>
//             </Svg>
//           </TouchableOpacity>
//           {/* <Image
//             source={require('../icon/coin13.png')}
//             style={{
//               marginLeft: windowWidth / 2 - 100,
//               width: 70,
//               height: 70,
//               resizeMode: 'contain',
//             }}
//           /> */}
//         </View>

//         <View
//           style={{
//             width: windowWidth,
//             height: tableHeight,
//             backgroundColor: '#fff',
//           }}>
//           <View
//             style={{
//               width: windowWidth,
//               height: 80,
//               alignSelf: 'center',
//               // backgroundColor: 'red',
//             }}>
//             <Text
//               style={{
//                 position: 'absolute',
//                 width: '100%',
//                 height: 70,
//                 lineHeight: 32,
//                 textAlign: 'center',
//                 fontSize: 25,
//                 marginTop: windowHeight / 10 - 65,
//                 fontWeight: 'bold',
//                 color: '#5C5C5C',
//                 alignSelf:'center'
//               }}>
//               登録者5000人まで全 {'\n'}国無料！今だけ！
//             </Text>
//           </View>

//           <FlatList
//             onEndReachedThreshold={0.3}
//             initialNumToRender={10}
//             removeClippedSubviews={true}
//             extraData={this.state.refresh}
//             style={{
//               width: '100%',
//               marginLeft: 5,
//               paddingTop: windowHeight - 800,
//               backgroundColor: '#fff',
//               borderRadius: 3,
//               alignSelf: 'center',
//             }}
//             viewabilityConfig={this.viewabilityConfig}
//             data={this.state.bundle}
//             renderItem={this.renderCell}
//             keyExtractor={item => item.bundleid}
//             refreshing={this.state.refreshing}
//             // onRefresh={this.handleRefresh}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const CoinCell = ({item, self}) => (
//   <TouchableOpacity
//     style={{
//       width: windowWidth - 33,
//       borderWidth:1,
//       marginTop: 10,
//       marginBottom: 10,
//       padding: 5,
//       marginLeft: 0,
//       borderRadius: 20,
//       backgroundColor: '#fff',
//       borderColor:'#EA337E',
//       flexDirection: 'row',
//       alignSelf:'center',
//       // borderWidth: 1,
//     }}
//     onPress={() =>
//       self.buy([item.item.bundleid, item.item.description, item.item.price])
//     }>
//        {/* {["Item1", "Item2", "Item3"].map(item => */}
//     {/* <Image
//       resizeMode="cover"
//       style={{
//         width: item.index == 7 || item.index == 6 ? 50 : 30,
//         height: 30,
//         marginTop: 6,
//         marginLeft: 5,
//       }}
//       source={{uri: 'https://goodlookin.live:8002/coin/' + item.item.image}}
//     /> */}

//     <Text
//       multiline={true}
//       style={{
//         height: 40,
//         width: windowWidth - 120,
//         lineHeight: item.index == 7 ? 20 : 40,
//         fontSize: 17,
//         paddingLeft: 10,
//         color: 'black',
//         fontStyle: 'italic',
//       }}>
//       {item.item.description}
//     </Text>

//     <Text
//       style={{
//         position: 'absolute',
//         width: 60,
//         left: windowWidth - 100,
//         // height: 50,
//         // lineHeight: 50,
//         textAlign: 'center',
//         fontSize: 16,
//         // paddingLeft: 10,
//         fontWeight: 'bold',
//         color: '#EA337E',
//         top:"30%"
//       }}>
//       {Math.round(item.item.price)}
//       {self.state.currencyText}
//     </Text>
//   </TouchableOpacity>
// );

// export default CoinScreen;

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

<<<<<<< Updated upstream
import Svg, {G, Path} from 'react-native-svg';
=======
import Svg, {
  G,
  Path,
  Stop,
  Defs,
  LinearGradient,
  Circle,
  Rect,
} from 'react-native-svg';
import moment from 'moment';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
        params['amount'] = global.price;
=======
        // params['call_count'] = 20;
        // params['mail_count'] = 20;
        // params['amount'] = 1;
        params['sku'] =  global.productId ;
>>>>>>> Stashed changes

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
        // try {
        //   await RNIap.initConnection();
        //   const availablePurchases = await RNIap.getAvailablePurchases();

        //   availablePurchases.forEach(purchase => {
        //     finishTransaction(purchase, true);
        //   });
        // } catch (error) {
        //   console.warn(
        //     'Failed to connect to IAP and finish all available transactions',
        //   );
        // }
      },
    );
  }

<<<<<<< Updated upstream
  componentDidMount() {
=======
 async componentDidMount() {

    try {
      await RNIap.initConnection();
      const availablePurchases = await RNIap.getAvailablePurchases();
  
      availablePurchases.forEach((purchase) => {
        finishTransaction(purchase, true);
      });
    } catch (error) {
      console.warn(
        "Failed to connect to IAP and finish all available transactions"
      );
    }

>>>>>>> Stashed changes
    this.init();
  }

  init() {
    // this.getCoins();
    let self = this;

    RNIap.initConnection().then(() => {
      RNIap.getProducts(self.state.items).then(res => {
        //  alert(JSON.stringify(res));
        // alert(1);
        self.setState({
          res: res,
          price: res[0].price,
          amount: res[0].amount,
          // showLoading: false,
          bundleid: res[0].bundleid,
          description: res[0].description,
        });
        global.price = self.state.price;

<<<<<<< Updated upstream
=======
        

>>>>>>> Stashed changes
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
          // bundleid: global.bundleid,
          // bundle: this.state.bundle,
          // amount: this.state.amount,
          // price: this.state.price,
          // description: this.state.description,
        };
<<<<<<< Updated upstream

=======
        this.state.amount = global.amount 
        params['bundleid'] = this.state.bundleid;
        params['amount'] = this.state.amount;
        params['price'] = this.state.price;
        params['name'] = this.state.name;
        params['description'] = this.state.description;
        // alert(JSON.stringify(this.state.amount ));
>>>>>>> Stashed changes
        global.socket.emit('on-points-bundle', params);
      },
    );
  }

  buy(productId, description, price) {
    let self = this;
<<<<<<< Updated upstream
    console.log(productId);

=======
    // alert(productId);

    global.productId = productId;


  this.getCoins();
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          </Text>
=======
          </Text> */}
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                alignSelf: 'center',
                top: windowWidth / 2 - 270,
                width: 250,
                height: 250,
                resizeMode: 'contain',
              }}
            />
=======
                position: 'absolute',
                width: '100%',
                height: 70,
                lineHeight: 32,
                textAlign: 'center',
                fontSize: 25,
                marginTop: windowHeight / 10 - 65,
                fontWeight: 'bold',
                color: '#5C5C5C',
                alignSelf: 'center',
              }}>
              登録者5000人まで全 {'\n'}国無料！今だけ！
            </Text>
>>>>>>> Stashed changes
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
            keyExtractor={item => item.bundleid}
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
<<<<<<< Updated upstream
=======
      borderWidth: 1,
>>>>>>> Stashed changes
      marginTop: 10,
      marginBottom: 10,
      padding: 5,
      marginLeft: 0,
      borderRadius: 3,
      backgroundColor: '#fff',
<<<<<<< Updated upstream
      flexDirection: 'row',
=======
      borderColor: '#EA337E',
      flexDirection: 'row',
      alignSelf: 'center',
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        color: 'black',
        borderWidth: 1,
=======
        color: '#EA337E',
        top: '30%',
>>>>>>> Stashed changes
      }}>
      {Math.round(item.item.price)}
      {self.state.currencyText}
    </Text>
  </TouchableOpacity>
);

export default CoinScreen;
