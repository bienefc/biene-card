import { useState, useEffect } from 'react';
import $ from 'jquery';
import './App.scss';

function App() {
  useEffect(() => {
    var $cards = $('.card');
    var $style = $('<style>').appendTo('head');

    $cards
      .on('mousemove touchmove', function (e) {
        var pos = [e.offsetX, e.offsetY];
        e.preventDefault();
        if (e.type === 'touchmove') {
          pos = [e.touches[0].clientX, e.touches[0].clientY];
        }
        var $card = $(this);
        var l = pos[0];
        var t = pos[1];
        var h = $card.height();
        var w = $card.width();
        var px = Math.abs(Math.floor((100 / w) * l) - 100);
        var py = Math.abs(Math.floor((100 / h) * t) - 100);
        var pa = 50 - px + (50 - py);
        var lp = 50 + (px - 50) / 1.5;
        var tp = 50 + (py - 50) / 1.5;
        var px_spark = 50 + (px - 50) / 7;
        var py_spark = 50 + (py - 50) / 7;
        var p_opc = 20 + Math.abs(pa) * 1.5;
        var ty = ((tp - 50) / 2) * -1;
        var tx = ((lp - 50) / 1.5) * 0.5;
        var grad_pos = `background-position: ${lp}% ${tp}%;`;
        var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
        var opc = `opacity: ${p_opc / 100};`;
        var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg);`;
        var style = `
        .card:hover:before { ${grad_pos} }
        .card:hover:after { ${sprk_pos} ${opc} }
      `;
        $cards.removeClass('active');
        $card.removeClass('animated');
        $card.attr('style', tf);
        $style.html(style);
        clearTimeout(x);
      })
      .on('mouseout touchend touchcancel', function () {
        var $card = $(this);
        $style.html('');
        $card.removeAttr('style');
        x = setTimeout(function () {
          $card.addClass('animated');
        }, 2500);
      });
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <>
      <main>
        <section className='cards'>
          <div className='card pika animated'></div>
        </section>
      </main>
    </>
  );
}

export default App;
