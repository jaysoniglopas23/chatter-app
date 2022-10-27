import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Slider from '@react-native-community/slider';
import Svg, {G, Path} from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Policy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: '0',
      drop_calls: '',
    };

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigationRef.current?.navigate('News');
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffff', height: '100%', flex: 1}}>
        <View
          style={{
            alignSelf: 'center',
            width: windowWidth - 40,
            height: '60%',
            backgroundColor: '#f8f8f9',
            borderRadius: 10,
          }}>
          <ScrollView>
            <Text style={{color: 'black', paddingBottom: 10,alignSelf:'flex-start',fontSize:12}}>
              この規約（以下「本規約」といいます）は、株式会社エウレカ（以下「当社」といいます）が提供するおしゃべりさん（おしゃべりさん）に関する全てのサービス（以下「本サービス」といいます）の利用に関する条件を、本サービスを利用するお客様（以下「利用者」といいます）と当社との間で定めるものです。
              {'\n'}
              {'\n'}
              第1条（規約への同意）
              本サービスをご利用になる前に、本規約を良くお読みください。
              {'\n'} {'\n'}
              利用者は、本規約の定めに従って本サービスを利用しなければなりません。
              {'\n'}
              利用者は、会員登録をしないかぎり本サービスを利用できません。{' '}
              {'\n'} {'\n'}
              利用者は会員登録をするにあたり、本規約に同意して頂くことが必要であり、会員登録が完了した時点で、本規約を内容とする本サービス利用契約（以下「本契約」といいます）が当社との間で締結されます。{' '}
              {'\n'} {'\n'}
              第2条（規約の適用）
              本規約の規定が利用者との本規約に基づく契約に適用される関連法令に反するとされる場合、当該規定は、その限りにおいて、
              当該利用者との契約には適用されないものとします。但し、この場合でも、本規約の他の規定の効力には影響しないものとします。{' '}
              {'\n'} {'\n'}
              第3条（本サービスの内容）
              本サービスは、日本在住の男女を対象とした、
              18歳以上（高校生は除く）の方の婚活をサポートするサービスです。{' '}
              {'\n'} {'\n'}
              日本国外からのご利用（日本国外のIPアドレスでのアクセスその他当社が日本国外からの利用と判断する場合を含む）はできませんので、ご注意ください。
              本サービスは、一部のサービスおよび機能を、無料でご利用いただけます。{' '}
              {'\n'} {'\n'}
              結婚相手探しのため、他の会員と十分なコミュニケーションをとるためには、
              有料の機能をお使いいただくことをお勧めしています。 {'\n'} {'\n'}
              なお、本サービスは結婚相手を見つけることを保証するものではありません。
              第4条（定義） {'\n'} {'\n'}
              本サービス利用規約において、次の用語はそれぞれ以下のように定義します。{' '}
              {'\n'} {'\n'}
              「コンテンツ」本サービスを通じて利用者が入力した、プロフィール、メッセージなどの一切の情報。{' '}
              {'\n'} {'\n'}
              「利用者」当社が定めた本サービスの登録手続きに従い、本規約に対し同意の上、本サービスの会員登録を完了し、本サービスを利用する資格を持つ個人をいいます。{' '}
              {'\n'} {'\n'}
              「有料サービス」本サービス上で利用者が任意で申し込むことができる有料の会員機能の総称（男性有料会員・プレミアムオプション・レディースオプション・プライベートモード）
              「おしゃべりさんポイント」おしゃべりさんポイントを使用して、当社所定の条件で、アイテムと交換することができます。{' '}
              {'\n'} {'\n'}
              「アイテム」使用することにより本サービス内で所定の効果を生じる「いいね！」「ブースト」「スタンプ」等を総称していいます。{' '}
              {'\n'} {'\n'}
              第5条（本サービスの提供、無保証、変更および中止）
              当社は、本サービスの提供を受けることができる利用者を、会員登録の有無、年齢、その他、
              当社が合理的に必要と判断する条件を満たしたお客様に限定することができるものとします。{' '}
              {'\n'} {'\n'}
              当社は、当社が合理的に必要と判断する場合、
              あらかじめ利用者に通知することなく、いつでも、本サービスの全部または一部の内容を変更し、また、その提供を中止することができるものとします。{' '}
              {'\n'} {'\n'}
              当社は、本規定に基づき当社が行った措置によって利用者に生じた損害について一切の責任を負いません。{' '}
              {'\n'} {'\n'}
              当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、
              正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、
              権利侵害などを含みますが、これらに限りません）がないことを保証しておりません。{' '}
              {'\n'} {'\n'}
              当社は、本サービスが、全てのパソコン、スマートフォン、タブレット端末等およびOSに対応することを保証しておりません。また、当社は、利用者の環境により本サービスを利用できなかったことに基づき利用者に生じた損害について、一切の責任を負いません。{' '}
              {'\n'} {'\n'}
              第6条（利用資格）
              日本在住の18歳以上（高校生は除く）で、交際相手がいない方、独身の方（現在離婚している方も含む）のみが、日本国内において利用可能な婚活をサポートするサービスです。年齢及び独身・交際相手の有無の判断は、当社が会員登録時のFacebookに登録された生年月日、交際ステータス、本人の自己申告等を元に合理的な範囲で行うものであり、全ての本サービスの会員が常時18歳以上かつ独身・交際相手がいないことを当社が保証するものではありません。登録後に違反が発見された場合、当社判断で会員登録を無効とさせていただきます。当社は、無効とする措置により利用者に発生した損害について一切の責任を負わないものとします。{' '}
              {'\n'} {'\n'}
              当社は、利用者が以下のいずれかに該当すると判断する場合、当該利用者に対し以下に定める措置の実施を求め、当該措置の実施により利用資格等につき確認ができるまでの間、会員登録を拒否し、または本サービスの利用を停止することができるものとします。当社は、これにより利用者に発生した損害について一切の責任を負わず、また、利用停止中の有料サービスの利用料金の返金もいたしません。{' '}
              {'\n'} {'\n'}
              （1）独身であることに疑義がある場合：独身証明書の提出
              （2）会員登録情報の虚偽その他利用資格に疑義がある場合：本人確認手続の履行
              （3）不正利用防止のために実施する本人確認の対象として選ばれた場合（無作為による抽出を含む）：本人確認手続の履行
              利用者は、本サービスをご利用になることによって、本契約に参加し本契約の規約と条件の全てに従う権利、権限、義務および能力を有すると表明し、保証するとみなされます。{' '}
              {'\n'} {'\n'}
              本サービスは、現在会員の犯罪経歴調査は行っておらず、会員の経歴も問い合わせず、会員の申告も確認は行っていないため、他の利用者について、この点を当社が保証するものではない点をご理解してください。{' '}
              {'\n'} {'\n'}
              当社は、利用者について、いずれかの犯罪経歴調査や他の審査（例：性的犯罪者登録検索）を、いつでも、利用可能な公的記録を使用して、行うことができるものとしますが、これを行う義務を負うものではありません。{' '}
              {'\n'} {'\n'}
              本サービスは、現在または今後の会員の行為や整合性に関して、保証しておりません。{' '}
              {'\n'} {'\n'}
              当社は、利用者が下記の事由に相当する場合は、会員登録の拒否を行うことが出来るものとします。{' '}
              {'\n'} {'\n'}
              本規約に違反するおそれがあると当社が合理的に判断した場合
              当社に提供された登録情報の全部又は一部につき虚偽、誤記又は記載漏れがあった場合
              過去に本サービスまたは株式会社おしゃべりさんエンゲージその他当社の所属するMatch
              Group（詳しくはこちらをご参照ください。）のグループ会社が運営するサービスの利用規約に違反もしくは違反する恐れがあると合理的に判断され、または利用者の責に帰すべき事由によりそれらのサービスの利用の登録を取り消された者である場合
              成年被後見人、被保佐人、又は被補助人のいずれかであり、法定代理人、後見人、保佐人又は補助人の同意等を得ていなかった場合
              反社会的勢力等（暴力団、暴力団体、右翼団体、反社会的勢力、その他これに準ずる者を意味します。{' '}
              {'\n'} {'\n'}
              以下同じ。）である、又は資金提供その他を通じて反社会的勢力等の維持、運営若しくは経営に協力若しくは関与する等反社会的勢力等との何らかの交流若しくは関与を行っていると当社が判断した場合
              その他、当社が登録を適当でないと合理的に判断した場合
              利用者は、プロフィール情報に変更が生じた場合は、直ちに当社所定の方法により、プロフィール情報の変更を行うものとします。{' '}
              {'\n'} {'\n'}
              第7条（利用者の責任および注意義務）
              利用者は、自己の責任に基づき本サービスを利用するものとし、利用者が公開するコンテンツについて、全て自己で責任を負うものとします。{' '}
              {'\n'} {'\n'}
              利用者は当社に対し、他人の著作物を使用したことなどが原因で紛争、損害賠償の請求などが起こった場合の損害、責任について一切を免責するものとし、自らの責任をもって紛争に対処するものとします。{' '}
              {'\n'} {'\n'}
              利用者は、自己の責任において、おしゃべりさんアカウントを管理及び保管するものとし、これを第三者に利用させたり、貸与、譲渡、名義変更、売買等をしてはならないものとします。{' '}
              {'\n'} {'\n'}
              利用者は、当社に対し、おしゃべりさんアカウントを第三者に盗用されるなどにより、利用者のコンテンツの改変や改竄、個人情報等の無断閲覧などにより発生するあらゆる紛争、損害賠償の請求などについて一切を免責するものとします。{' '}
              {'\n'} {'\n'}
              利用者は、本サービス利用中に知り得た他の利用者に関する情報（他の利用者のプロフィール情報、投稿コンテンツに含まれる情報を含みますが、これらに限りません。以下「利用者情報」といいます）について、守秘義務を負うものとします。{' '}
              {'\n'} {'\n'}
              利用者は、これらの情報につき、本サービスの利用以外の目的での使用、第三者に対する開示または漏洩、当社の許可なく複製・複写のいずれもしてはならず、また、本サービスの利用終了後または当該他の利用者との交際等の終了後は、速やかに当該他の利用者のこれらの情報を破棄しなければなりません。{' '}
              {'\n'} {'\n'}
              利用者は、本条で定める行為において当社に損害を与えた場合は、当社が当該利用者に対して損害賠償を請求する権利を有することを認めます。
              当社は、以下のいずれかに該当する場合には、利用者に事前に通知することなく、本サービスの利用の全部又は一部を停止又は中断することができるものとします。{' '}
              {'\n'} {'\n'}
              本サービスに係るコンピューター・システムの点検又は保守作業を定期的又は緊急に行う場合
              コンピューター、通信回線等が事故により停止した場合
              火災、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合
              FacebookまたはSMSログインサービスに、トラブル、サービス提供の中断又は停止、仕様変更等が生じた場合
              ログインや決済等、サービスの重要な機能に障害が発生した場合
              その他、当社が停止又は中断を必要と判断した場合
              当社は、本条に基づき当社が行った措置に基づき利用者に生じた損害について一切の責任を負いません。{' '}
              {'\n'} {'\n'}
              第8条（禁止事項）
              利用者は、本サービスの利用に際して、以下の行為を行ってはならないものとします。利用者がこれらの禁止行為を行った、又は行うおそれがあると当社が合理的に判断した場合、利用者に通知することなく、当社は該当する内容のデータの削除、当該利用者に対して注意を促す表示を行う、または利用制限もしくは強制退会させることができるものとします。ただし、当社は、当該データ等を掲載停止または削除する義務を負うものではなく、データの削除および利用制限等の処分につきまして当社は説明の義務を負わないものとします。{' '}
              {'\n'} {'\n'}
              利用者は、これらの禁止行為を行うことにより当社に損害を与えた場合は、当社が当該利用者に対して損害賠償を請求する権利を有することを認めます。
              なお、当社は、本条に基づき当社が行った措置に基づき利用者に生じた損害について一切の責任を負いません。{' '}
              {'\n'} {'\n'}
              会員のアイコン画像、サブ写真を含む、本サービス上の画像を当社の承諾なくキャプチャーその他の方法により複製、利用又は公開する行為
              本規約に反する行為
              日本国または利用者に適用される国・地域の法令に違反する行為
              社会規範・公序良俗に反するものや、他人の権利を侵害し、または他人の迷惑となるようなものを、投稿、掲載、開示、提供または送信（以下これらを総称して「投稿など」といいます）したりする行為
              利用者以外の自然人・法人・団体・組織等の第三者（以下、「第三者」といいます）に自己のおしゃべりさんアカウントを譲渡して、本サービスを利用させる行為
              第三者に自己のおしゃべりさんアカウントのログインに必要な情報を閲覧可能な状態にしておく行為
              本サービスに関連して、反社会的勢力に直接・間接に利益を提供する行為
              本サービスを、提供の趣旨に照らして本来のサービス提供の目的とは異なる目的で利用する行為
              他の利用者を含む第三者の個人情報や利用者情報を第三者に開示または漏洩する行為
              本サービス利用中に知り得た他の利用者の利用者情報を、本サービスの利用以外の目的で使用する行為
              本サービス利用中に知り得た他の利用者の利用者情報を、当社の許可なく複製・複写する行為
              既婚者の会員登録および本サービスの利用（登録後に既婚者となった場合も含みます）
              18歳未満（高校生を含む）の会員登録および本サービスの利用
              児童を騙る行為
              性描写、残酷な表現、犯罪を誘発する表現、差別表現など、公序良俗に反する行為やコンテンツ閲覧者
              第三者に成りすます行為
              虚偽の情報をコンテンツに掲載し、コンテンツ閲覧者を欺く行為
              第三者の名誉や社会的信用を毀損したり、不快感や精神的な損害を与える行為
              選挙運動、またはこれらに類似する行為および公職選挙法に抵触する行為
              コンテンツ閲覧者を含む利用者以外の自然人・法人・団体・組織等の第三者の個人情報の収集を行う行為
              当社、他の利用者またはその他の第三者の保有する著作権を含む知的財産権、肖像権その他一切の権利を侵害し、または侵害を誘発する行為
              当社が許可した場合を除く、本サービス上の文字、画像、会員のニックネーム、アイコン画像、サブ写真、プロフィール情報、自己紹介文、その他の会員の情報を無断で使用する行為（モザイク処理をしても、当社が許可をしていない場合は無断使用と見なします）
              本サービスの運営を妨げる行為
              当社が、本サービスの運営を妨げるおそれがあると判断する量のデータ転送、サーバーに負担をかける行為（不正な連続アクセスなど）
              商用目的の宣伝・広告行為（例：アダルト関連サービスへの誘導を目的として特定または不特定多数の利用者にメッセージ機能などの方法で送信したりする行為）
              有害なコンピュータウィルス、コード、ファイル、プログラム等を開示する行為、もしくは開示されている場所について示唆する行為
              無限連鎖講およびマルチ商法、またはそれに類するもの、その恐れのあるもの、あるいは当社が無限連鎖講およびマルチ商法、またはそれに類するもの、その恐れのあるものと判断する内容を掲載する行為
              児童ポルノ、またはそれに類する内容、あるいは当社が児童ポルノに類すると判断する内容を掲載する行為
              性器露出画像、動画、あるいは性器を描写したデータ等、当社が性器を描写した内容であると判断した内容のサイトへのリンクを掲載する行為
              次のようなコンテンツを投稿などすること
              許可を得ないで第三者のプロフィールや写真を使用したコンテンツ
              集団および個人に対するあらゆる種類の人種差別や偏見、憎悪、身体的危害を助長するコンテンツのような、オンラインコミュニティーに対して明らかに不快だと思われるコンテンツ
              他人への嫌がらせのコンテンツ、または嫌がらせを支持するコンテンツ
              嘘であることや誤解を招くということを利用者がわかっている情報を広めるコンテンツや、違法行為を助長するコンテンツ、または罵倒、脅迫、わいせつ、名誉毀損、文書による名誉毀損に当たるような行為を助長するコンテンツ
              ｢ジャンクメール｣、｢チェーンメール｣、迷惑メール、｢スパム｣などの送信に関連するコンテンツ
              海賊版コンピュータ･プログラムを提供したり、それにリンクを張ったり、製品に組み込まれたコピー防止機能を回避する情報を提供したり、海賊版音楽を提供したり、海賊版音楽ファイルにリンクを張ったりするなどして、他人の著作権によって保護された作品を違法または不正にコピーすることを助長するコンテンツ
              性的または暴力的な手法で18歳未満の人を不当に利用するコンテンツ。{'\n'} {'\n'} または、18歳未満の人から個人情報を求める構成要素を提供するコンテンツ
              営利的または違法な目的のために、他の利用者からパスワードや個人情報を求めるコンテンツ
              違法な武器の製造、購入や、他人のプライバシーの侵害、コンピュータウィルスの製造など、違法行為に関する説明を提供するコンテンツ
              公開されていないページや、パスワードがないとアクセスできないページを含んだコンテンツ
              コンテスト、宝くじ、物々交換、宣伝、ネズミ講など、当社から事前に書面で許可を得ないで、営利的活動または販売を行うコンテンツ
              Facebookの利用規約に反する行為
              日本国外から本サービスを利用する行為
              その他当社が不適切であると判断する行為 {'\n'} {'\n'}
              第9条（本サービスの利用制限）
              当社は、本サービス以外での利用者の行為を監視することができませんが、本サービスから得た情報を、他人に対する嫌がらせや罵倒、危害を加える目的で使用したり、事前に明示的な同意を相手から得ずに他の会員に連絡、宣伝、勧誘、販売したりすることも、本規約に対する違反になります。そのような宣伝や勧誘から当社の会員を守るために、利用者が他の会員に24時間以内に送ることができるメールの数を、当社の妥当な判断で適切な数に制限する権利を当社は有します。{' '}
              {'\n'} {'\n'}
              第10条（契約期間および契約の終了）
              利用者が本サービスの会員である限り、本契約は有効です。会員になって本サービスに参加することを利用者が選ばれた場合は、本サービスを即座に開始することを利用者が選ばれたことになり、クーリングオフは認められません。
              利用者は本サービスの退会申請フォームから契約終了の通知を当社にお送りいただくことで、いつでもいかなる理由でも、利用者は会員資格を終了させることができます。{' '}
              {'\n'} {'\n'} 退会申請フォームからご連絡ください。 {'\n'} {'\n'}{' '}
              また、利用者は、カスタマーサポートへの申し出、及び本人確認手続き等の当社所定の手続きを行うことにより、会員資格を終了させることができます。{' '}
              {'\n'} {'\n'}
              利用者が本契約の一つ以上の条項に違反した場合、また、そのおそれがあると当社が合理的に判断した場合、当社はいつでも利用者の会員資格を即座に終了させ、禁止するコンテンツを削除し、本サービスの利用を終了させることができます。{' '}
              {'\n'} {'\n'}{' '}
              この場合、お客様がおしゃべりさんに登録したメールアドレス宛に、当社は終了通知を送ることとします。{' '}
              {'\n'} {'\n'}{' '}
              さらに、利用者が本サービスの全部または一部にアクセスすることを、恒久的または一時的に当社は禁止することができます。{' '}
              {'\n'} {'\n'}
              会員登録が取り消しとなった場合、利用者が退会した場合、その他の理由により利用者が会員資格を失った場合または利用ができなかった場合、有料サービスについて利用者が購入された利用期間が終了しておらずまたは利用期間中利用できなかった期間が含まれていても、返金は致しかねます。{' '}
              {'\n'} {'\n'}{' '}
              また、利用者がおしゃべりさんポイントまたはアイテムを保有していた場合、当該おしゃべりさんポイントまたはアイテムは有効期限の定めにかかわらず、会員資格の喪失と同時に失効し、利用できなくなります。{' '}
              {'\n'} {'\n'}
              利用者が会員資格を有したまま有料サービスを終了された場合、終了以前に利用者が購入された利用期間が残っていても、有料サービスの一切がご利用できなくなります。
              {'\n'} {'\n'} また、日割りでの返金も含め、返金は致しかねます。{' '}
              {'\n'} {'\n'}
              利用者が有料会員でない場合、（本サービスに最後に接続した日から数えて）6ヵ月以上本サービスを利用しなかった会員のアカウントを、本サービスは無効にすることができます｡
              {'\n'} {'\n'}
              第11条（再利用の禁止）
              利用者が、当社のサービスやそれらを構成するデータを、本サービスの提供目的を超えて利用した場合、当社は、それらの行為を差し止める権利ならびにそれらの行為によって利用者が得た利益相当額を請求する権利を有します。
              {'\n'} {'\n'}
              第12条（無料会員と有料会員、および利用料金）
              本サービスは、一部のサービスおよび機能を、無料でご利用いただけます。他の会員とのメッセージのやり取りといったサービスおよび追加機能を利用するには、本サービスの有料会員になる必要があります。
              {'\n'} {'\n'}{' '}
              最新の有料会員プランと利用料金に関する詳細は、説明のページ(https://おしゃべりさん.lv/static/plan)をご覧ください。本サービスに加入する際に開示される加入方針は、本規約の一部であることをご注意ください。
              他の会員と連絡をとるなどの追加の機能やサービスを利用するためには、本サービスの有料会員になる必要があります。
              {'\n'} {'\n'}{' '}
              なお、お申し込み後の変更・キャンセルはお受けできませんのでご了承ください。
              {'\n'} {'\n'}
              また、お客様が申し込まれた有料サービスを利用期間の途中で利用休止またはご解約（解約は退会フォームからお願いいたします）された場合も、返金や未利用期間の日割り計算による精算は行っておりませんのでご注意ください。
              {'\n'} {'\n'}
              なお、有料サービスは利用者が自ら自動更新を停止しない限り、自動的に更新されます。
              {'\n'} {'\n'} 詳細はヘルプをご確認ください。
              第13条（おしゃべりさんポイントおよびアイテム）
              利用者は、購入により、または本サービスでの所定の条件成就、キャンペーン等で無償で付与されることにより、おしゃべりさんポイントを取得することができます。
              {'\n'} {'\n'}
              利用者が購入したおしゃべりさんポイントに、資金決済に関する法律（以下「資金決済法」といいます）第二章「前払式支払手段」の規定は適用されません。
              {'\n'} {'\n'}
              利用者が購入できるおしゃべりさんポイントの上限は10,000ポイントです。
              {'\n'} {'\n'}{' '}
              おしゃべりさんポイントの購入単位、価格、決済方法、その他の条件は、当社が定め本サービスまたは当社ウェブサイトに表示します。
              {'\n'} {'\n'}
              おしゃべりさんポイントは、当社が指定するアイテム以外の、現金、財物その他の経済上の利益と交換することはできません。アイテムとの交換に必要なポイント数その他の交換条件は、当社が定め本サービスまたは当社ウェブサイトに表示します。
              {'\n'} {'\n'}
              利用者は、Parisポイントとの交換により、または本サービスでの所定の条件成就、キャンペーン等で無償で付与されることにより、アイテムを取得することができます。
              {'\n'} {'\n'}
              アイテムの内容、使用方法、使用期限、交換ポイント数、その他の使用条件等の詳細については、当社が定め本サービスまたは当社ウェブサイトに表示します。
              {'\n'} {'\n'}{' '}
              利用者はこれらの定めに従いアイテムを使用することができます。{'\n'}{' '}
              {'\n'}{' '}
              アイテムは、現金、財物その他の経済上の利益と交換することはできません。
              {'\n'} {'\n'}
              利用者は、未使用のおしゃべりさんポイントまたはアイテムについて、返金または払戻しを受けることはできません。
              おしゃべりさんポイントおよびアイテムは、付与された利用者のアカウントでのみ使用することができ、他のアカウントに譲渡または移転させることはできません。
              {'\n'} {'\n'}
              おしゃべりさんポイントおよびアイテムを複数保有している場合、古く付与された順に消費されます。
              {'\n'} {'\n'}
              アイテムは、おしゃべりさんポイントと交換された時点、その他、利用者に付与された時点をもってこれにかかる役務提供がなされたものとし、資金決済法の定める前払式支払手段には該当しません。
              {'\n'} {'\n'}
              第14条（投稿などの削除、サービスの利用停止、アカウント削除について）
              利用者が本サービスに投稿などしたコンテンツと、本サービスを通してお客様が他の会員に転送したコンテンツについて、お客様は単独で責任を負います。
              {'\n'} {'\n'}{' '}
              利用者が投稿した場合はいつでも、そのコンテンツが（a）正確かつ（b）本契約に違反せず、かつ（c）あらゆる点で誰にも害が及ばないことを、お客様は表明し保証したことになります｡
              {'\n'} {'\n'}
              当社は、提供するサービスを適正に運営するために、以下の場合にはあらかじめ通知することなく、データやコンテンツを削除したり、サービスの全部または一部の利用をお断りしたり、利用者のアカウントを削除したりするといった措置を講じることができるものとします。
              {'\n'} {'\n'}
              利用者が本規約に定められている事項に違反した場合、もしくはそのおそれがあると当社が合理的に判断した場合
              当社にお支払いいただく代金について支払の遅滞が生じた場合
              本サービスの代金決済手段として指定されたクレジットカードや銀行口座の利用が停止された場合
              利用者が破産もしくは民事再生の手続の申立てを受け、または利用者自らがそれらの申立てを行うなど、利用者の信用不安が発生したと当社が判断した場合
              アカウントが反社会的勢力またはその構成員や関係者によって登録または使用された場合、もしくはそのおそれがあると当社が判断した場合
              利用者が一定期間にわたってアカウントまたは特定のサービスを使用していない場合
              その他、利用者との信頼関係が失われた場合など、当社と利用者との契約関係の維持が困難であると当社が判断した場合
              また、本サービス上での利用者間のメッセージのやりとりは、当社の管理する電子掲示板を通じて提供されます。電子掲示板は、当該メッセージのやりとりをされる利用者同士と当社の三者が閲覧できる仕様となっております。
              {'\n'} {'\n'}{' '}
              利用者は、当社が事故防止ならびに健全なサービスを運営する目的で、メッセージの内容を閲覧、削除することに同意するものとします。
              {'\n'} {'\n'}{' '}
              但し、当社として電子掲示板を巡回・監視する義務を負うものではありません。
              {'\n'} {'\n'}
              第15条（当社に対する補償）
              利用者は、利用者が法令または本規約に違反して本サービスを利用したことに起因して（かかる趣旨のクレームを第三者より当社が受けた場合を含みます）、当社が直接的もしくは間接的に何らかの損害、損失または費用負担（弁護士費用の負担を含みます）を被った場合、当社の請求にしたがって直ちにこれを賠償または補償しなければなりません。
              {'\n'} {'\n'}
              第16条（利用者のデータおよびコンテンツの取扱い）
              当社の本サービスの保守や改良などの必要が生じた場合には、当社は利用者が当社の管理するサーバーに保存しているデータを、本サービスの保守や改良などに必要な範囲で複製等することができるものとします。
              {'\n'} {'\n'}
              利用者が投稿などをしたコンテンツ（位置情報、画像データ、テキストを含みますが、これらに限られません。
              {'\n'} {'\n'}{' '}
              以下「投稿コンテンツ」といいます）については、利用者または当該投稿コンテンツの著作権者に著作権が帰属します。
              {'\n'} {'\n'}{' '}
              投稿コンテンツについて、利用者は当社に対して、日本の国内外で無償かつ非独占的に利用（複製、上映、公衆送信、展示、頒布、譲渡、貸与、翻訳、翻案、出版を含みます）する権利を期限の定めなく許諾（サブライセンス権を含みます）したものとみなします。
              {'\n'} {'\n'}{' '}
              ただし、利用者間のメッセージ内容についてはプライバシーを尊重し、本条の許諾対象には含まないものとします。
              {'\n'} {'\n'} なお、利用者は著作者人格権を行使しないものとします。
              {'\n'} {'\n'}
              利用者が本サービスを利用して生成した投稿コンテンツについての著作権を除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他知的財産権はすべて当社または当社がその利用を許諾した権利者に帰属し、利用者は無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます）、伝送、配布、出版、営業使用等をしてはならないものとします。
              {'\n'} {'\n'}
              当社は、投稿コンテンツの利用を、利用者自身を除く、他の利用者その他の第三者に許諾するものではなく、利用者は他の利用者の投稿コンテンツの権利を侵害する行為を行ってはならないものとします。また、利用者は投稿コンテンツをクロール等で自動的に収集、解析する行為も行ってはならないものとします。
              {'\n'} {'\n'}
              当社は、他の利用者の投稿コンテンツを利用したことによって利用者に生じた損害について、一切の保証をいたしません。また、利用者が他の利用者の投稿コンテンツを利用して利益を得た場合には、当社はその利益相当額の金員を請求できる権利を有するものとします。
              {'\n'} {'\n'}
              第17条（連絡または通知）
              利用者は、本利用規約に別段の定めがある場合を除き、当社への連絡はお問い合わせフォームから行うものとします。
              {'\n'} {'\n'}{' '}
              当社は電話による連絡および来訪は受け付けておりません。{'\n'}{' '}
              {'\n'}
              利用者への連絡または通知の必要があると当社が判断した場合には、Facebookに登録されたメールアドレス宛もしくはショートメッセージにてメールにて連絡または通知を行います。
              {'\n'} {'\n'}{' '}
              ただし、利用者から正確な連絡先の提供がなされていない場合の不利益に関しては、当社は一切責任を負いません。
              {'\n'} {'\n'}
              第18条（権利義務などの譲渡）
              利用者は、本規約に基づくすべての契約について、その契約上の地位およびこれにより生じる権利義務の全部または一部を、第三者に譲渡または貸与することはできません。
              {'\n'} {'\n'}
              当社は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びに利用者の登録情報その他の顧客情報を当該事業譲渡の譲受人に譲渡することができるものとし、利用者は、かかる譲渡につき本項において予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。
              {'\n'} {'\n'}
              第19条（会員間の紛争）
              利用者は、自己の責任に基づき本サービスを利用するものとし、本サービスの他の会員との交流に関しては、単独で責任を負うものとします。当社は、利用者と他の会員との間で起きた紛争を監視する権利を留保しますが、義務はありません。
              {'\n'} {'\n'}
              第20条（プライバシー）
              本サービスの使用には、当社のプライバシーポリシーも適用されます。会員が当社に提供した（機密性の高い個人情報も含む）個人情報は、当社のコンピュータに保存されます。興味や好み、閲覧のパターンについてのプロフィールを作成し、会員が本サービスに参加できるようにするために、当社がこの情報を利用することに、会員は同意するものとします｡
              {'\n'} {'\n'}
              第21条（Facebookとの関係）
              当社は、利用者がFacebookの利用規約およびプライバシーポリシーに従わなかったことによる違反の結果、Facebookを通じて本サービスを利用できなくなってしまっても、責任を負わないものとします。
              当社は、いかなる理由でもFacebookのアカウントを中断、遮断、閉鎖、または終了されたことにより、本サービスを利用できなくなってしまっても、責任を負わないものとします。
              {'\n'} {'\n'}
              Facebookを利用して本サービスのアカウントを作成している場合であって、Facebookの退会その他の理由により利用者がFacebookを利用できなくなった場合には本サービスも利用できなくなります。この場合、利用者は、自己の責任で、第10条第2項の規定に従って本サービスの退会手続きをするものとし、当該手続きを行わなかったことにより利用料金が発生した場合でも、当社は一切の責任を負いません。
              {'\n'} {'\n'}
              第22条（児童を誘引する行為の規制）
              本サービスでは、インターネット異性紹介事業を利用して児童を誘引する行為の規制を行っております。
              この目的は、「インターネット異性紹介事業の利用に起因する児童買春その他の犯罪から児童を保護し、もって児童の健全な育成に資すること」です。このような目的を実現するため、本サービスではサービス利用に当たって男女共に身分証明書など予め定められた方法による年齢確認を行っております。
              また、自己紹介文の記入欄において、年齢確認前に出会えてしまう可能性を排除するため、自己紹介文の投稿監視を行っております。その為、年齢確認前に自己紹介文にて、出会えてしまう場所や時間などの要素が入っている場合は、当社は予告なく、自己紹介文の掲載をできないようにしたり、削除等させて頂く場合があり、会員はこれに同意するものとします。
              {'\n'} {'\n'}
              第23条（免責事項）
              当社の債務不履行責任は、当社の故意または重過失によらない場合には免責されるものとします。
              なお、お客様との本規約に基づく当社のサービスのご利用に関する契約が消費者契約法に定める消費者契約に該当する場合、上記の免責は適用されないものとし、当社は、当社の故意・重過失に起因する場合を除き、通常生じうる損害の範囲内で、かつ、有料サービスにおいては代金額（継続的なサービスの場合は1か月分相当額）を上限として損害賠償責任を負うものとします。
              {'\n'} {'\n'}
              本サービスの構成要素は、あらゆる種類の条件、保証、またはその他の契約条件なしに、無保証で提供されます。したがって、この法的通知がなければ本サービスとの関係で効力を持った可能性のあるすべての説明、保証、条件、またはその他の契約条件（満足のゆく品質、目的適合性、合理的な配慮と技術の行使など、法によって暗示されている条件を含みますが、これに限られません）を法によって認められている最大限度まで本サービスは排除するという前提で、当社は本サービスをお客様に提供します。
              {'\n'} {'\n'}
              当社や当社のパートナー企業、会員やその他の個人または団体が、本サービスを通じて表示し、アップロードし、または配布する助言、意見、声明やその他の情報について、当社はその正確さや信頼性を表明し保証するものではありません。以上のような意見、会員プロフィール、助言、声明や情報を信頼することについては、お客様の自己責任になることをお客様は承認するものとします。
              {'\n'} {'\n'}{' '}
              オンラインでもオフラインでも、会員の行動について当社は責任を負いません。本サービスを利用される際は、注意をして常識を働かせてください。適用法令の下で排除することが不可能な強行法規の権利（消費者としてのお客様の実定法上の権利を含みます）を、この法的通知および以上の免責事項は排除するものではありません。
              {'\n'} {'\n'}
              本サービスは、日本国内においてのみ利用することができ、日本国外から利用（日本国外のIPアドレスでのアクセスその他当社が日本国外からの利用と判断する場合を含む）はできません
              {'\n'} {'\n'}{' '}
              。当社は、日本国外から本サービスを利用できないことにより利用者に発生した損害について一切の責任を負わず、また、有料サービスの利用料金の返金もいたしません。
              {'\n'} {'\n'}
              第24条（本サービスのご利用上の注意）
              本サービスは、結婚相手を真剣に探している18歳以上（高校生は除く）の交際相手がいない方、独身の方（現在離婚している方も含む）に対して、婚活をサポートするサービスですが、
              不特定多数の方がご利用になっているため、場合によっては本サービスを悪用されたりする可能性があります。
              {'\n'} {'\n'} そのような可能性があることをご認識のうえ、{'\n'}{' '}
              {'\n'}
              他の会員（特にメッセージのやり取りを行う他の会員）に対してのやりとり方法、個人情報の開示に関しては、慎重に考えて、本サービスをご利用ください。また、やり取りをしている会員が独身・交際相手がいないか否かは初回登録時のFacebookの交際ステータスおよびご本人の自己申告による情報等を元に当社が合理的な範囲で判断しております。そのため、全ての会員様が18歳以上で、かつ独身・交際相手がいないことを保証するものではございません。他の会員に対して本サービス以外でのやりとり手段の提供、個人情報等重要な情報の開示を行う場合は、慎重に検討し自己の責任のうえで行うようにしてください。規約違反の疑いがある会員を発見した場合は、すみやかに違反報告ボタン、またはお問い合せより違反内容をご報告ください。
              本サービスでは、Facebookでの認証をされた利用者に限り、会員登録時または自動、会員自身による手動操作によりFacebookの友達リストを取得し、友達リストに掲載された会員との関係ではお互いの存在が検索結果に表示されない仕組みを提供しています。本サービスにより取得されている友達リストが最新でない場合、従前の友達リストに含まれない最新の友達リストに含まれる友達は検索結果に表示される可能性がありますのでご注意ください。また、この機能は、現実の知人、友人、Facebook上の友達の友達その他のFacebookの友達リストに含まれない人物にお互いの利用状況を知らせない機能を提供するものではないことをご了承ください。
              {'\n'} {'\n'}
              利用者は、自らの責任によりFacebookの設定を行うものとします。利用者は、Facebookの設定に関する当社の指示に従わなかった場合には、Facebookの友人に利用者が本サービスを使用されることを知られるなどの不利益が生ずる可能性があることに予め同意するものとします。当社は、利用者が行ったFacebookの設定に起因して利用者に発生した損害について一切の責任を負わないものとします。
              利用者は、Facebook以外を利用して登録した場合、会員登録によって、現実の友人、知人等の第三者に本サービスを使用していることを知られるなどの不利益が生ずる可能性があることに予め同意するものとします。
              {'\n'} {'\n'}
              利用者は、当社がFacebookのバグ、不具合、瑕疵等について一切の責任を負わないことに予め同意するものとします。
              利用者は、Facebookの仕様、サービス内容その他の事項が変更されることにより、本サービスの内容や機能が変更される場合があることに予め同意するものとします。当社は、かかる変更により利用者に発生した損害について一切の責任を負わないものとします。
              {'\n'} {'\n'}
              第25条（本サービス及び利用規約の変更について）
              当社が必要と判断した場合には、利用者の事前の承諾を得ることなく、本規約をいつでも変更することができるものとします。なお、改定に際しては随時、利用者に告知するものとします。本規約変更後に、利用者が本サービスをご利用される場合には、変更後の本規約の内容を承諾したものとみなします。
              {'\n'} {'\n'}
              第26条（準拠法）
              本規約は、日本法に準拠し、解釈されるものとします。{'\n'} {'\n'}
              第27条（管轄裁判所）
              利用者と当社との間で訴訟の必要が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </Text>
            {/* <Text style={{color: 'black', paddingBottom: 10}}>
            Theme 特定商取引違法
          </Text>
          <Text style={{color: 'black'}}>インターネット異性紹介事業 </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            届け出、認定済み 認定番号
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            特定商取引法基づく表記
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・役務の提供者 　おしゃべりさん運営事務局
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・運営責任者 　林 明
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・所在地 　東京都渋谷区代々木3-15
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>連絡先</Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            osyaberisann@gmail.com
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・お支払い方法 　グーグルウォレット
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・料金表 　1コイ
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・利用料金支払い時期 　プラン購入時(前払い)
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・商品引き渡し 　入金後即
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・退会方法 　アプリをアンインストール後、３日でデータ完全削除
          </Text>
          <Text style={{color: 'black', paddingBottom: 10}}>
            ・返金、キャンセル
            　商品の特性上、返品、返金はしかねますのでご了承ください。
          </Text> */}
          </ScrollView>
        </View>
        <View
          style={{
            top: windowWidth / 2 - 150,
            backgroundColor: '#ffff',
            // flex: 1,
            width: windowWidth - 25,
            height: windowHeight / 2 - 550,
            // backgroundColor: 'black',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => this.goBack()}
            style={{
              backgroundColor: '#ECECEC',
              height: 31,
              flexDirection: 'row',
              width: 50,
              borderRadius: 2,
            }}>
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
            <Text style={{right: 0, top: 6, color: 'black'}}>戻る</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Policy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    borderColor: '#cdd5d5',
    top: 50,
    marginHorizontal: 150,
  },

  view: {
    top: 90,
    height: 50,
    right: 370,
  },

  view1: {
    top: 10,
    borderWidth: 1,
    borderColor: '#cdd5d5',
    height: 100,
    marginHorizontal: 22,
    right: 20,
    borderRadius: 5,
    marginBottom: 20,
  },

  label: {
    bottom: 11,
    right: 142,
    backgroundColor: '#fff',
    marginHorizontal: 147,
  },

  email: {
    bottom: 11,
    right: 155,
    backgroundColor: '#fff',
    marginHorizontal: 162,
  },

  introduction: {
    bottom: 11,
    right: 135,
    backgroundColor: '#fff',
    marginHorizontal: 142,
  },

  text: {
    bottom: 5,
    left: 11,
  },

  Image: {
    top: 10,
    width: 100,
    height: 100,
    borderRadius: 1,
    left: 15,
    borderWidth: 1,
  },
});