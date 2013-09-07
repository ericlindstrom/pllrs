# Templates object, currently only containing the column_markup

templates =
  column_markup: '''
    <div class="column" data-number="<%= number+1 %>"></div>
  '''

adjustLayout = (val) ->
  $layout = $ '#layout'
  $layout.find('.column').remove()
  i = 0
  while i < val
    $layout.append _.template templates.column_markup, 'number': i
    i++

# We're ready
$ ->
  adjustLayout $('#columns').val()

  # Change the attr class based on the current input
  $('#pllrs').on 'keyup', (e) ->
    $('#layout').attr 'class', e.currentTarget.value

  # Autofill the class attribute with `favorites`
  $('.favorite').on 'click', (e) ->
    e.preventDefault()
    new_class = $(@).data 'class'
    $('#pllrs').val new_class
    $('#layout').attr 'class', new_class

  # Update columns input field will update the columns showing
  $('#columns').on 'keyup', (e) ->
    adjustLayout e.currentTarget.value
