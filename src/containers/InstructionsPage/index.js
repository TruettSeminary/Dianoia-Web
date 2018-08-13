import React from 'react'; 

import { Router } from 'utils/router'; 

import './styles.css'; 

function Link(props) {
    return (<a onClick={(event) => {
        event.preventDefault(); 
        Router.pushPage(props.href); 
    }}>
        {props.label}
    </a>); 
}


class InstructionsPage extends React.Component {

    generateSection(title, content) {
        return (
            <div>
                <h2>{title}</h2>
                <div>
                    {content}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="instructionsPageContainer">
                    <h1>Dianoia Basic Instructions</h1>
                    <p>
                        We want to help you get the most out of Dianoia. On this page you'll find some basic instructions
                        for setting up an account, interacting with cards, and practicing translations. If you think a section should be
                        added to this page, feel free to mention it to us on our{' '}
                        <Link href='/feedback' label='feedback page' />
                    </p>
                    {this.generateSection('Registering and Logging In', <p>
                        To start using Dianoia, you'll need to register first. 
                        You can head to the{' '}
                        <Link href="/registration" label="registration page"/>{' '}
                        and sign up. You'll automatically be logged in after registering. 
                        Should you log out, you can log back in by clicking the "log in" button
                        in the side menu. 
                    </p>)}
                    {this.generateSection('Your home page', <p>
                        When you first log in, you'll be taken to your home page. There, you will 
                        be presented with decks you have saved. Clicking on a deck will take 
                        you to a page to view the deck in study mode. You'll read how to save a deck in a 
                        following section. 
                    </p>)}
                    {this.generateSection('Joining a class',<p>
                        All your decks are contained within classes. To save a deck, you'll first need to 
                        join the class. To do this, you can head to the{' '}
                        <Link href='/classes' label='classes page'/>{' '}
                        and click the "join" button on any class you want to save decks from. 
                    </p>)}
                    {this.generateSection('Saving decks', <p>
                        On the{' '}
                        <Link href='/classes' label='classes page'/>{' '}
                        you can hit the '+' or '-' symbol next to a deck to add or remove it. 
                        Once a deck is added, you'll be able to navigate to it by clicking the "decks"
                        button (taking you to the deck in list mode) or the "study" button (taking you
                        to the deck in study mode). 
                    </p>)}
                    {this.generateSection('Viewing decks: list mode', <p>
                        When viewing a deck in list mode, you will be presented with all the cards from
                        that deck on a single page. Clicking on an individual card will take you to a page
                        with details about that card. 
                    </p>)}
                    {this.generateSection('Viewing a card', <p>
                        When viewing a specific card, you'll be presented with the front text, back text, and 
                        details about a card. The details are presented under the orange bar. By selecting
                        the different tabs on the bar, you'll be able to view different details about the card. 
                        Currently those details include: information about the card, your notes about the card, 
                        any professor notes about the card, images related to the card, and videos related to the card. 
                    </p>)}
                    {this.generateSection('Viewing decks: study mode', <div><p>
                        When viewing a deck in study mode, you will be presented with cards in their priority order, one at a time. 
                        The priority order of a card is determined by your interaction with it. For a given card, if you swipe right
                        the card will show up more frequently (i.e. this is a card you need to study more). If you swipe left, the card 
                        will show up less frequently (i.e. you know this card with some certainty). 
                    </p>
                    <p>
                        If you do not know a card, or are just beginning to learn a card, you can tap on it to see the back. This does
                        not change the cards priority order. If you need more help when viewing the card, details are offered, identitical
                        to those when viewing an individual card, to give a hint. 
                    </p></div>)}
                    {this.generateSection('Viewing translations', <p>
                        Translations are associated with decks. To view translations from a certain deck, you'll first need to add that deck. 
                        Once this is done, you can which deck to view translations from by clicking the "translations" button on the side menu.
                        This will take you to a page that lists all translations for the given deck. Clicking on a page will allow you to view
                        that specific translation. 
                    </p>)}
                    {this.generateSection('Interacting with translations', <div><p>
                        The translation page is intended to help you practice and prioritize which words you should study more. Translations 
                        are interactive. While attempting to translate a sentence, you can double tap a word and information about that word will
                        popover translation. Doing this will increase the priority of a given card/word. Some words might not have any information
                        when you tap on this. Which words do or do not have information is at the discretion of the professor. 
                    </p>
                    <p>
                        While on the translation page, you are presented with a text box to practice your translation. Your translation is not saved. 
                        The text box is merely there for your convenience as you try to translate the sentence. 
                    </p></div>)}
            </div>
        );
    }
}

export default InstructionsPage; 