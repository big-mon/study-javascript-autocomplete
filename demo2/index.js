new autoComplete({
  // 対象となる入力欄の指定
  selector: "#autoComplete",
  placeHolder: "「a」を入力...",
  minChars: 1,
  maxResults: 5,

  // 外部定義をソースとして使用
  data: {
    src: async () => {
      const source = await fetch('https://raw.githubusercontent.com/big-mon/study-javascript-autocomplete/main/demo2/ticker.json', {mode: "cors",});
      const data = await source.json();
      return Object.values(data);
    },
    key: ["ticker", "title"],
    cache: false,
  },
  highlight: true,
  trigger: {
    event: ["input", "focus"],
  },
  resultItem: {
    // オートコンプリートの候補に対する処理
    content: (data, element) => {
      // 候補がdataとして渡される
      console.log(data.value.Name);

      element.style = "display: flex; justify-content: space-between;";
      element.innerHTML = `
      <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${data.match}
      </span>
      <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
        ${data.key}
      </span>`;
    },
  },
  feedback: (data) => {
    console.log(data);
  },
  // 候補を選択した場合の処理
  onSelection: (feedback) => {
    console.log(feedback);

    document.querySelector("#autoComplete").blur();

    const selection = feedback.selection.value.ticker;
    document.querySelector(".selection").innerHTML = selection;
    document.querySelector("#autoComplete").value = selection;
  },
});
