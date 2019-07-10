# Code Test: 'Factoid Cards' [![Build Status](https://travis-ci.org/christophgomez/codetest.svg?branch=master)](https://travis-ci.org/christophgomez/codetest)

Please read this whole README before starting.

## Overall Requirements
Create an application to feature one of your extracurricular interests. Select an interest that has items of alike members (Stamps, Books, Songs, etc). Please use this as a chance to showcase your personality by selecting a category of things you enjoy.

The application should have a frontend for a web browser and a backend in node.js, use whatever libraries you are most familiar with otherwise.

## Front End Requirements

The User Interface should be made out of a MVVM or MVC style frontend technology, using an asynchronous transport technology to talk to your backend.

#### The user interface should present a card like entry containing
* [ :white_check_mark:] A small picture of the item
* [ :white_check_mark:] A description of the item
* [ :white_check_mark:] A fun factoid for the item

#### Interactions
* [ :white_check_mark:] The user should be able to dismiss the currently presented card, making it disappear and presenting the next card in the stack. (Think of swiping in Tinder)
* [ :white_check_mark:] The user should be able to create their own factoid to be added to the fact stack.
* [ :white_check_mark:] The user should be able to remove a factoid from the fact stack.

## Backend Requirements

The Backend should be node.js with whatever middlewares you'd like to use.

#### Interactions to support
* [ :white_check_mark:] Please provide a RESTful backend for the CRUDL of factoids
* [ :white_check_mark:] Factoids should be transported to the UI via JSON
* [ :white_check_mark:] Factoids should be stored in some sort of SQL/NoSQL/Flat File on the backend

## BONUS

Consider adding some improvements to what you've made to really showcase your strengths.

### Suggestions for improvements
* [ :white_check_mark:] Integrate this with an external Service or API (Pokemon API FTW)
* [ :white_check_mark:] Make it work on Mobile device sizes. 
* [ :white_check_mark:] Write a test or two for your code.
* [ :white_check_mark:] Add a lint file and make sure your code is linted. 
* [ :white_check_mark:] Add CD/CI to your project to auto-deploy it
