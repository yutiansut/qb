export default function en (state){

  const { nameCny, nameUsd, netUrl, applyEmailUrl, contactEmailUrl, addr } = state;

  // 公共、主页及不在其他模块的翻译属于common
  const common = {
    home_v1: "home",
    exchange_v1: "exchange",
    assets_v1: "assets",
    order_v1: "order list",
    security_v1: "Security center",
    idVerify_v1: "ID verification",
    logOut_v1: "Log out",
    total_v1: "Total",
    favorite_v1: "Favorites",
    favorites_v1: "Favourites",
    market_v1: "Market",
    markets_v1: "Markets",
    lastPrice_v1: "Latest price",
    volume_v1: "Volume",
    change_v1: "Change",
    change7D_v1: "7D Change",
    infoView_v1: "Info Overview",
    seeMore_v1: "See more",
    readMore_v1: "Read more",
    yes_v1: "Yes",
    no_v1: "No",
    email_v1: "Email Address",
    phone_v1: "Mobile",
    alter_v1: "Update",
    set_v1: "Settings",
    fundPass_v1: "Funding Password",
    twoStep_v1: "2-Step Verification",
    save_v1: "Save",
    add_v1: "Add",
    example_v1: "example",
    or_v1: "or",
    action_v1: "Action",
    buy_v1: "Buy",
    sell_v1: "Sell",
    price_v1: "Price",
    amount_v1: "Amount",
    deposit_v1: "Deposit",
    cny_v1: "CNY",
    usd_v1: "USD",
    state_v1: "Status",
    time_v1: "Time",
    cancel_v1: "Cancel",
    pending_v1: "pending",
    passed_v1: "Passed",
    failed_v1: "Failed",
    fee_v1: "Fee"
  };
  const asset = {
    "asset-totalAssets_v1": "Total assets (approx)",
    "asset-balance_v1": "Balance",
    "asset-24hQuota_v1": "Withdraw quota in 24H",
    "asset-limitApply_v1": "Apply for a higher withdrawal limit",
    "asset-usedAsset_v1": "Already in used",
    "asset-hideLittle_v1": "Hide small balance",
    "asset-hideZero_v1": "Hide 0 balances",
    "asset-withdraw_v1": "Withdraw",
    "asset-trade_v1": "Trade",
    "asset-currency_v1": "Currency",
    "asset-fullname_v1": "Full name",
    "asset-avail_v1": "Available Balance",
    "asset-lock_v1": "Frozen balance",
    "asset-tobtc_v1": "BTC Valuation",
    "asset-tip1_v1": "Less than0.001BTC",
    "asset-tip2_v1": "No trading has been matched",
    "asset-tip3_v1": "Available balance valuation",
    "asset-records_v1": "Assets records",
    "asset-selectCoin_v1": "Select currency",
    "asset-amount_v1": "Amount",
    "asset-orderLock_v1": "Frozen order",
    "asset-depositTip_v1":
      "OBS! Do not charge any other currencies to {currency} address except {currency}, any other currencies to {currency} address would not be refunded",
    "asset-depositAddress_v1": "deposit address",
    "asset-showQrcode_v1": "Show the QR code",
    "asset-copy_v1": "Copy to clipboard",
    "asset-reminder_v1": "Friendly reminder",
    "asset-depositReminder1_v1":
      "Deposit to {currency} address, {number} confirmations would be needed",
    "asset-depositReminder2-1_v1": "Deposit & Withdraw",
    "asset-depositReminder2-2_v1": "Tracking progress",
    "asset-toTrade_v1": "Trade",
    "asset-depositHistory_v1": "Deposits history",
    "asset-depositTime_v1": "deposit time",
    "asset-depositAmount_v1": "deposit amount",
    "asset-sendAddress_v1": "From",
    "asset-receiveAddress_v1": "To",
    "asset-confirm_v1": "Subscription Period",
    "asset-viewAll_v1": "View all",
    "asset-minWithdraw_v1":
      "OBS：Minimal withdraw amount is{number}{currency};do not withdraw to ICO address,We would not deal with the token in the future.",
    "asset-withdrawAddress_v1": "withdraw address",
    "asset-addAddress_v1": "add address",
    "asset-withdrawAmount_v1": "Amount of Withdrawal",
    "asset-withdrawAvailable_v1": "Available Balance",
    "asset-gasFee_v1": "Gas fee",
    "asset-withdrawActual_v1": "Actual Deposit Amount"
  };
  const market = {};
  const notice = {};
  const order = {};
  const deal = {};
  const user = {};
  const login = {};
  const help = {
    "help-termsFirst_v1":
      `Ownership and operation of the services offered by ${nameUsd} .com are the property of ${nameUsd} Ltd. (hereinafter referred to as "${nameUsd} .") ${nameUsd} Terms of Service (hereinafter referred to as "Agreement")  defines the rights and obligations of ${nameUsd} users and CoinRising as engaged in various services. Access and/or use of this site constitutes acceptance of and agree to all terms and conditions of this Agreement. ${nameUsd} , as the operator of ${netUrl},  will provide services for users pursuant to this Agreement. Users unwilling to accept the terms of this Agreement shall not access or use this site.`
  };
  return Object.assign(
    {},
    common,
    asset,
    market,
    notice,
    order,
    deal,
    user,
    login,
    help
  );
}
