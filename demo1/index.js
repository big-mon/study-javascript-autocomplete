new autoComplete({
  // 対象となる入力欄の指定
  selector: "#autoComplete",
  placeHolder: "「a」を入力...",
  minChars: 1,

  // ローカル定義をソースとして使用
  data: {
    src: [
      { Ticker: "AAPL", Name: "Apple Inc." },
      { Ticker: "MSFT", Name: "Microsoft" },
      { Ticker: "AMZN", Name: "Amazon.com" },
    ],
    key: ["Ticker", "Name"],
    cache: false,
    results: (list) => {
      // Filter duplicates
      const filteredResults = Array.from(
        new Set(list.map((value) => value.match))
      ).map((items) => {
        return list.find((value) => value.match === items);
      });

      return filteredResults;
    },
  },
  maxResults: 5,
  sort: (a, b) => {
    if (a.match < b.match) return -1;
    if (a.match > b.match) return 1;
    return 0;
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
  noResults: (dataFeedback, generateList) => {
    // Generate autoComplete List
    generateList(autoCompleteJS, dataFeedback, dataFeedback.results);
    // No Results List Item
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = `<span style="display: flex; align-items: center; font-weight: 100; color: rgba(0,0,0,.2);">Found No Results for "${dataFeedback.query}"</span>`;
    document
      .querySelector(`#${autoCompleteJS.resultsList.idName}`)
      .appendChild(result);
  },
  feedback: (data) => {
    console.log(data);
  },
  // 候補を選択した場合の処理
  onSelection: (feedback) => {
    console.log(feedback);

    document.querySelector("#autoComplete").blur();

    const selection = feedback.selection.value.Ticker;
    document.querySelector(".selection").innerHTML = selection;
    document.querySelector("#autoComplete").value = selection;
  },
});
