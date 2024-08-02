let searchemg = document.getElementById("search");
let emoji_container = document.getElementById("emoji-container");
let filterEmg = document.getElementById("filter-emoji");

// -------------- Display all emojis dynamically -----------------------
let displayEmoji = function (emojiList) {
  emoji_container.innerHTML = emojiList
    .map((data) => {
      return ` <div class="emoji-item relative text-center bg-orange-100 hover:bg-blue-100 shrink-0 grow-0 shadow-lg p-1 rounded-lg m-2 w-[75px] text-[50px] cursor-pointer"> 
                 <p class="emoji-character"  onclick="copyEmoji(this)"> ${
                   data.emoji
                 } </p>
                 <span class="copy-feedback absolute bottom-0 left-1/2 transform -translate-x-1/2 scale-0 rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm font-medium shadow-md transition-transform duration-300 ease-in-out">
                    Copied
                 </span>
                 <h4 class="hidden">${data.tags.join(",")}</h4>
                 <h5 class="hidden">${data.annotation}</h5>
                </div>
                `;
    })
    .join("");
};

//------ Filter by categories -----------
let filterFunction = (value) => {
  let filteredData;

  if (value.toLowerCase() === "all") {
    filteredData = emojiList;
  } else {
    filteredData = emojiList.filter((e) => {
      if (e.annotation.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (
        e.tags.some((tag) => tag.toLowerCase().startsWith(value.toLowerCase()))
      ) {
        return true;
      }
      return false;
    });
  }

  displayEmoji(filteredData);
};

//--------------- Filter by given categories --------------------
filterEmg.addEventListener("click", (e) => {
  const button = e.target.closest(".filter-btn");

  if (button) {
    e.preventDefault();
    const category = button.getAttribute("data-category");
    filterFunction(category);
  }
});

//-------------- Search your emoji -----------------------
const searchFun = () => {
  let searchByEmo = searchemg.value;
  console.log("emo", searchByEmo);
  let searchBox = searchemg.value.toUpperCase();
  let emoji_items = document.querySelectorAll(".emoji-item");

  for (let i = 0; i < emoji_items.length; i++) {
    let h4 = emoji_items[i].getElementsByTagName("h4")[0];
    let p = emoji_items[i].getElementsByTagName("p")[0];

    if (h4 || p) {
      let textValue = h4.innerText || h4.innerHTML;
      let emojiValue = p.innerHTML || p.innerText;

      if (
        emojiValue.match(searchByEmo) ||
        textValue.toUpperCase().indexOf(searchBox) > -1
      ) {
        emoji_items[i].style.display = "";
      } else {
        emoji_items[i].style.display = "none";
      }
    }
  }
};

//------------ copy clipboard------------
function copyEmoji(element) {
  // Copy the emoji to clipboard
  const emoji = element.innerText;
  navigator.clipboard.writeText(emoji);

  // Show the "Copied" feedback when click
  const feedback = element.nextElementSibling;
  feedback.classList.remove("scale-0");
  feedback.classList.add("scale-100");
  setTimeout(() => {
    feedback.classList.remove("scale-100");
    feedback.classList.add("scale-0");
  }, 1000);
}

// Load initial emojis
window.addEventListener("load", () => {
  displayEmoji(emojiList);
});
