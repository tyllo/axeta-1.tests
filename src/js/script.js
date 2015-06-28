
(function ($) {

  // предопределенные селекторы
  var cancel = 'button[name="cancel"]';
  var ok = 'button[name="ok"]';
  var container = '.container-input';
  var containerSkills = '#skills';
  var skill = 'input[name="skill"]';

  // сохраним в памяти шаблон со skill
  var label = $('.label[data-skill="strong"]')[0];

  // глобальные переменные (((
  var $input = false, value, $container;

  /*****************************************************
                     удаляем скилы
  =====================================================*/

  // навесим событие удаление из DOM label с навыком (PHP, Ruby)
  $('#skills').on('click', cancel, function (e) {
    // удалим ближайшего подходящего родителя
    $(e.target).closest('.label').remove();
  });

  /*****************************************************
          click <button>  name, location и lang
  =====================================================*/

  // обрабатываем клик на <input>
  $('input').click(function (e) {
    console.log('<input> click');
    // закроем предыдущий <input>, если это не тот же
    if ( $input != false ) {
      var name = {};
      name.input  = $input.attr('name');
      name.target = $(e.target).attr('name');
      if ( name.input == name.target ) {
        return;
      } else{
        $input.trigger('close');
      };
    };
    // запомним input
    $input = $(e.target);
    // запомним значение до изменения
    value = $input.val().trim();
    // запомним контейнер и активируем
    $container = $input.closest(container);
    $container.addClass('active');
  });

  /*****************************************************
         слушаем событие ok или cancel на <input>
  =====================================================*/
  // слушаем событие close у <input>
  $('input').on('close', function (e) {
    console.log('<input> close');
    // деактвируем контейнер
    $container.removeClass('active');
    // установим старое значение value
    if ( $input ) $input.val(value);
    // сбросим input
    $input = false;
  });

  // слушаем событие ok у <input name=skill>
  $(skill).on('ok', function (e) {
    console.log('<input> ok skill');
    value = $(e.target).val();
    // если ничего не ввели
    if ( !value || value == '' ) {
      return false;
    };
    // навесим на label свои значения
    var $label = $(label).clone();
    // установим атрибут
    var selected = 'select[name="level"] option:selected';
    var data = $(selected).val();
    $label
      .attr('data-skill', data)
      .find('span').text(value);
    $label.appendTo('#skills');

    // сбросим input
    $input.val('');
  });

  // слушаем событие ok у <input>
  $('input').on('ok', function (e) {
    console.log('<input> ok');
    // мы уже ввели новое зачение input
    // остается только деактивировать
    $container.removeClass('active');
    // сбросим input
    $input = false;
  });

  /*****************************************************
     навесим триггер focusout на <input> name=skill
  =====================================================*/
  $('input').focusout(function (e) {
    console.log('<input> focusout');
    // если value не изменился или пустой, то закроем
    if ( $(e.target).val() === value && value != '' )
      $input.trigger('close');
  });

  /*****************************************************
         навесим триггеры на <button> ok или cancel
  =====================================================*/
  // buttom[name=cancel]
  $(cancel).click(function (e) {
    $input.trigger('close');
  });

  // buttom[name=ok]
  $(ok).click(function (e) {
    $input.trigger('ok');
  });
})(jQuery);

// пасхалка
(function ($) {
  var eggClick = 0;
  $('.egg').click(function (e) {
    eggClick++;
    switch (eggClick) {
      case 10:
        alert('Прекращай безобразничать');
        break
      case 11:
        alert('Кому сказано?');
        break
      case 12:
        alert('Достал!!!');
        $(e.target).remove();
        break
      default:
        $(e.target).html('span').text(eggClick);
        break
    };
  });
})(jQuery);
