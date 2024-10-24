const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}


function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}


function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "You awaken in a dark confined space. You've don't know where you are or who you are.",
    options: [
        {
            text: "*Sleepy* I dont wanna wake up...",
            setState: {awakenedClone: false},
            nextText: 3,
        },
        {
            text: "*Wakeful* What's going on? Where am I?",
            setState: {awakenedClone: false},
            nextText: 2,
        },
    ]
},
{
    id: 2,
    text: "You hear voices. They approach, the stop, they approach again. They're geting closer all the time.",
    options: [
        {
            text: "C'mon already, lets go!",
            setState: {awakenedClone: false},
            nextText: 4,
        },
        {
            text: "Leave me be! I don't want to wake up!",
            setState: {awakenedClone: false},
            nextText: 3,
        },
    ]
},
{
    id: 3,
    text: "You hear voices. They approach, the stop, they approach again. They're geting closer all the time.",
    options: [
        {
            text: "I want to sleep!",
            setState: {awakenedClone: false},
            nextText: 4,
        },
        {
            text: "Ok, let's figure this out.",
            setState: {awakenedClone: false},
            nextText: 5,
        },
    ]
},
{
    id: 4,
    text: "The voices are so close now. Your container opens and light fills your eyes. You can make out two figures. They stare at you.",
    options: [
        {
            text: "Stare back.",
            setState: {awakenedClone: false},
            nextText: 5,
        },
        {
            text: "Where am I. Who are you?",
            setState: {awakenedClone: false},
            nextText: 6,
        },
    ]
},
{
    id: 5,
    text: "One of the two figures outside your tank flatly speaks 'Clone LNTWOS-4. Get up and report for edumation.'",
    options: [
        {
            text: "You get up",
            setState: {awakenedClone: false},
            nextText: 7,
        },
        {
            text: "Begone! I don't want to wake up!",
            setState: {awakenedClone: false},
            nextText: 6,
        },
    ]
},
{
    id: 6,
    text: "They ignore your question. One of the two figures outside your tank flatly speaks 'Clone LNTWOS-4. Get up and report for edumation.'",
    options: [
        {
            text: "You get up.",
            setState: {awakenedClone: true},
            nextText: 7,
        },
        {
            text: "Begone! I don't want to wake up!",
            setState: {awakenedClone: true},
            nextText: 8,
        },
    ]
},
{
    id: 7,
    text: "They lead you down a long hallway full of other people. Some dressed like you, some dressed like your chaperones. Everybody looks the same.",
    options: [
        {
            text: "What a bunch of weirdos!",
            setState: {awakenedClone: false},
            nextText: 10,
        },
        {
            text: "What a bunch of cool looking dudes!",
            setState: {awakenedClone: false},
            nextText: 9,
        },
    ]
},
{
    id: 8, 
    text: "The two figures waste no time. They grab you out of the bag and manually handle you out of the room.",
    options: [
        {
            text: "Try to resist",
            setState: {awakenedClone: false},
            nextText: 7,
        },
        {
            text: "Give up, and go along with them.",
            setState: {awakenedClone: false},
            nextText: 7,
        },
    ]
},
{
    id: 9,
    text: "You are led through to another room, full of rows of chairs and terminals. You are taken to one and are sat down in front of it. Blinking at you is a user interface. Clone name input: _",
    options: [
        {
            text: "I'm feeling great about this!",
            setState: {awakenedClone: false},
            nextText: ,
        },
    ]
},
{
    id: 10,
    text: "You are led through to another room, full of rows of chairs and terminals. You are taken to one and are sat down in front of it. Blinking at you is a user interface. Clone name input: _",
    options: [
        {
            text: "I'm not sure about this...",
            setState: {awakenedClone: false},
            nextText: ,
        },
    ]
}, 
  


]

startGame()